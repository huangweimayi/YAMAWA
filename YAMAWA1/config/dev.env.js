'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://211.149.169.201/index.php/index"',
  BASE_API: '"http://127.0.0.1/index.php/index"',
})
