'use strict'

const fp = require('fastify-plugin')

function fastifyRobConfig(fastify, options, next) {
  const { confKey, asProperties } = options

  let config

  if (options.config) {
    config = options.config
  } else {
    try {
      config = require('rob-config') // eslint-disable-line global-require
    } catch (e) {
      return next(e)
    }
  }

  try {
    config.validate()
  } catch (e) {
    e.message = `[rob-config] ${e.message}`

    return next(e)
  }

  fastify.decorate(
    confKey || 'config',
    asProperties ? config.properties() : config
  )

  next()
}

module.exports = fp(fastifyRobConfig, {
  fastify: '>=2.0.0',
  name: 'fastify-rob-config'
})
