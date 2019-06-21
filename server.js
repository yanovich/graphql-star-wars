/* server.js -- main application file
 * Copyright 2019 AO GUOV
 *
 * Contributors:
 * Ianovich Sergei <yanovich.sv@guov.ru>
 *
 * Licensed under AGPL-3.0 or later, see LICENSE
 */

require('@babel/register')
require('@babel/polyfill')

const http = require('http')
const app = require('./app')

http.createServer(app).listen(app.get('port'), () => console.info('sample: listening on port 3000'))
