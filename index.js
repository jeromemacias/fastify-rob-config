'use strict'

const fp = require('fastify-plugin')

const Ajv = require('ajv')
const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: true
})

const optsSchema = {
  type: 'object',
  required: [],
  properties: {
    confKey: { type: 'string', default: 'config' },
    asProperties: { type: 'boolean', default: false },
    config: { type: 'object', default: null }
  }
}
const optsSchemaValidator = ajv.compile(optsSchema)

function loadAndValidateConfig(fastify, options, next) {
  const isOptionsValid = optsSchemaValidator(options)
  if (!isOptionsValid) {
    return next(new Error(optsSchemaValidator.errors.map(e => e.message)))
  }

  const confKey = options.confKey

  let config

  if (options.config) {
    config = options.config
  } else {
    try {
      config = require('rob-config')
    } catch (e) {
      return next(e)
    }
  }

  try {
    config.validate()
  } catch (e) {
    e.message = '[rob-config] ' + e.message

    return next(e)
  }

  fastify.decorate(confKey, options.asProperties ? config.properties() : config)

  next()
}

module.exports = fp(loadAndValidateConfig, {
  fastify: '>=1.0.0-rc.1',
  name: 'fastify-rob-config'
})
