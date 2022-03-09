const mix = require('laravel-mix');
const fs = require('fs');

mix.setResourceRoot('dist');

mix
  .js('./src/js/index.js', './dist/js')
  .sourceMaps()
  .then(() => {
    fs.unlinkSync('mix-manifest.json');
  });

mix
  .css('./src/css/style.css', './dist/css')
  .options({
    processCssUrls: false,
    postCss: [
      require('postcss-import'),
      require('tailwindcss/nesting'),
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  })
  .sourceMaps();

mix.browserSync({
  server: {
    baseDir: '.',
    index: 'index.html',
  },
  port: 3000,
  proxy: false,
  files: '**/*',
});
