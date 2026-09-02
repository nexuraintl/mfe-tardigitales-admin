const fs = require('fs');
const path = require('path');

// Directorios origen y destino
const srcDir = path.join(__dirname, 'dist', 'jcc-portal', 'browser');
const destDir = path.join(__dirname, 'dist', 'jcc-portal-mfe');

async function buildMfe() {
  try {
    console.log('Iniciando empaquetado del Microfrontend...');

    // Verificar si el directorio origen existe
    if (!fs.existsSync(srcDir)) {
      throw new Error(`El directorio de origen no existe: ${srcDir}. ¿Ejecutaste 'ng build' antes?`);
    }

    // Crear directorio de destino si no existe
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Leer archivos del directorio de origen
    const files = fs.readdirSync(srcDir);

    // Filtrar archivos JS (excluyendo sourcemaps y licencias si existen)
    // El orden de concatenación ideal en Angular suele ser polyfills -> main
    const jsFiles = files.filter(f => f.endsWith('.js') && !f.endsWith('.map') && !f.includes('txt'));
    
    // Ordenar para asegurar que polyfills vaya primero
    jsFiles.sort((a, b) => {
      if (a.includes('polyfills')) return -1;
      if (b.includes('polyfills')) return 1;
      return 0;
    });

    console.log('Archivos JS detectados para concatenar:', jsFiles);

    // Concatenar todos los archivos JS en un único archivo
    let concatenatedJs = '';
    for (const file of jsFiles) {
      const filePath = path.join(srcDir, file);
      concatenatedJs += `\n/* --- Component Bundle: ${file} --- */\n`;
      concatenatedJs += fs.readFileSync(filePath, 'utf8');
    }

    const outputJsPath = path.join(destDir, 'jcc-portal-mfe.js');
    fs.writeFileSync(outputJsPath, concatenatedJs, 'utf8');
    console.log(`¡JS unificado creado con éxito en: ${outputJsPath}!`);

    // Concatenar o copiar estilos CSS
    const cssFiles = files.filter(f => f.endsWith('.css') && !f.endsWith('.map'));
    console.log('Archivos CSS detectados:', cssFiles);

    let concatenatedCss = '';
    for (const file of cssFiles) {
      const filePath = path.join(srcDir, file);
      concatenatedCss += `\n/* --- Estilos: ${file} --- */\n`;
      concatenatedCss += fs.readFileSync(filePath, 'utf8');
    }

    const outputCssPath = path.join(destDir, 'jcc-portal-mfe.css');
    fs.writeFileSync(outputCssPath, concatenatedCss, 'utf8');
    console.log(`¡CSS unificado creado con éxito en: ${outputCssPath}!`);

    // Copiar layout.js y layout.css de Web Components
    const wcLayoutJs = path.join(__dirname, '..', 'wc_admin_layout', 'dist', 'layout.js');
    const wcLayoutCss = path.join(__dirname, '..', 'wc_admin_layout', 'dist', 'layout.css');
    
    if (fs.existsSync(wcLayoutJs)) {
      fs.copyFileSync(wcLayoutJs, path.join(destDir, 'layout.js'));
      console.log(`¡layout.js copiado a: ${destDir}!`);
    } else if (fs.existsSync(path.join(__dirname, 'public', 'layout.js'))) {
      fs.copyFileSync(path.join(__dirname, 'public', 'layout.js'), path.join(destDir, 'layout.js'));
    }

    if (fs.existsSync(wcLayoutCss)) {
      fs.copyFileSync(wcLayoutCss, path.join(destDir, 'layout.css'));
      console.log(`¡layout.css copiado a: ${destDir}!`);
    } else if (fs.existsSync(path.join(__dirname, 'public', 'layout.css'))) {
      fs.copyFileSync(path.join(__dirname, 'public', 'layout.css'), path.join(destDir, 'layout.css'));
    }

    // Copiar carpeta assets si existe
    const assetsSrc = path.join(srcDir, 'assets');
    const assetsDest = path.join(destDir, 'assets');
    if (fs.existsSync(assetsSrc)) {
      fs.cpSync(assetsSrc, assetsDest, { recursive: true });
      console.log(`¡Carpeta assets copiada a: ${assetsDest}!`);
    }

    // Generar index.html para uso independiente
    const indexHtmlContent = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <title>JCC Portal</title>
    <base href="/">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- Web Components Layout Oficial Nexura (Lit) -->
    <link rel="stylesheet" href="layout.css">
    <link rel="stylesheet" href="jcc-portal-mfe.css">
    <script src="layout.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer></script>
  </head>
  <body>
    <app-root></app-root>
    <script src="jcc-portal-mfe.js" type="module"></script>
  </body>
</html>`;

    const outputHtmlPath = path.join(destDir, 'index.html');
    fs.writeFileSync(outputHtmlPath, indexHtmlContent, 'utf8');
    console.log(`¡index.html creado con éxito en: ${outputHtmlPath}!`);

    console.log('Proceso de empaquetado del Microfrontend finalizado exitosamente.');
  } catch (error) {
    console.error('Error durante el build del MFE:', error);
    process.exit(1);
  }
}

buildMfe();
