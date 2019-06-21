/* app.js -- application setup
 * Copyright 2019 AO GUOV
 *
 * Contributors:
 * Ianovich Sergei <yanovich.sv@guov.ru>
 *
 * Licensed under AGPL-3.0 or later, see LICENSE
 * Star Wars sample of GraphQL schema with buildSchema
 */

const fs = require('fs')
const path = require('path')
const express = require('express')
const graphqlMiddleware = require('express-graphql')

const config = require('./config/app')
const { schema } = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const app = express()

app.set('port', config.port)

app.use('/graphql', graphqlMiddleware({
  schema: schema,
  rootValue: resolvers,
  graphiql: config.isDevelopment
}))

module.exports = app
