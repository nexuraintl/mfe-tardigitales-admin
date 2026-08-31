import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { mkdirSync, copyFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildShell() {
  console.log('Compilando nx-admin-layout Web Component con Lit de forma INDEPENDIENTE...');
  
  const entryPoint = join(__dirname, 'src/app/shared/nexura-layout/index.ts');
  const outDir = join(__dirname, 'dist/nexura-layout');
  const publicDir = join(__dirname, 'public');
  mkdirSync(outDir, { recursive: true });
  mkdirSync(publicDir, { recursive: true });

  // 1. Bundle ESM (para frameworks modernos: React, Vue, Vite, etc.)
  await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    minify: true,
    sourcemap: true,
    format: 'esm',
    target: ['es2022'],
    outfile: join(outDir, 'nx-admin-layout.esm.js'),
  });

  // 2. Bundle IIFE Universal (para scripts universales y angular.json)
  await esbuild.build({
    entryPoints: [entryPoint],
    bundle: true,
    minify: true,
    sourcemap: true,
    format: 'iife',
    globalName: 'NexuraLayout',
    target: ['es2022'],
    outfile: join(outDir, 'nx-admin-layout.js'),
  });

  // Copiar el archivo compilado independiente a public
  copyFileSync(join(outDir, 'nx-admin-layout.js'), join(publicDir, 'nx-admin-layout.js'));

  console.log('¡Layout independiente compilado con éxito!');
  console.log(' -> dist/nexura-layout/nx-admin-layout.js     (Universal Standalone)');
  console.log(' -> dist/nexura-layout/nx-admin-layout.esm.js (ES Module Standalone)');
  console.log(' -> public/nx-admin-layout.js                (Copiado a public)');
}

buildShell().catch((err) => {
  console.error(err);
  process.exit(1);
});
