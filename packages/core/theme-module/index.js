const path = require('path')
const fs = require("fs")
const consola = require('consola')
const chalk = require('chalk');
const chokidar = require('chokidar')

const log = {
  info: (message) => consola.info(chalk.bold('VSF'), message),
  success: (message) => consola.success(chalk.bold('VSF'), message),
  warning: (message) => consola.warning(chalk.bold('VSF'), message),
  error: (message) => consola.error(chalk.bold('VSF'), message)
}

module.exports = function DefaultThemeModule (moduleOptions) {
  log.info(chalk.green('Starting Theme Module'))

  log.info('Adding theme files...')

  this.addTemplate({
    fileName: 'pages/Product.vue',
    src: path.join(__dirname, 'theme/pages/Product.vue'),
    options: {
      apiClient: moduleOptions.apiClient,
      helpers: moduleOptions.helpers,
      composables: moduleOptions.composables
    }
  });

  this.extendRoutes((routes, resolve) => {
    routes.unshift({
      name: 'product',
      path: '/p/:slug/',
      component: resolve(this.options.buildDir, 'pages/Product.vue'),
    });
  });

  log.success('Theme files succesfully added!')

  if(global.coreDev) {
    log.info(`Watching theme dir in Theme Module for changes.. ${chalk.italic('[coreDevelopment]')}`)
    this.nuxt.hook('build:before',(builder) => {
      chokidar.watch(path.join(__dirname, '../theme/')).on('all', (event, path) => {
        builder.generateRoutesAndFiles()
      });
    })
  }
}