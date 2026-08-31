import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function buildShell() {
  console.log('Compilando nx-admin-layout Web Component con Lit...');
  
  await esbuild.build({
    entryPoints: [join(__dirname, 'src/app/shared/nexura-layout/index.ts')],
    bundle: true,
    minify: true,
    sourcemap: true,
    format: 'esm',
    target: ['es2022'],
    outfile: join(__dirname, 'dist/nx-admin-shell.bundle.js'),
  });

  console.log('¡nx-admin-shell.bundle.js generado exitosamente en dist/!');
}

buildShell().catch((err) => {
  console.error(err);
  process.exit(1);
});
