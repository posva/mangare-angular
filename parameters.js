module.exports = {
  app_dir: './app/',
  build_dir: './public/',
  templates_file: 'app.templates.js',
  templates_module: 'templates',
  templates: '*/**/*.jade',
  jade: '*.jade',
  js: [
    '../node_modules/fuse.js/src/fuse.min.js',
    '**/module.js',
    '**/*.js',
  ],
  scss: '**/*.scss',
  build_file: 'app.js',
  build_css: 'style.css'
};
