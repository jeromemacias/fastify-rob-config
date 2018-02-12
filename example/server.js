'use strict'

const fastify = require('fastify')({ logger: true })
const plugin = require('../')
const config = require('rob-config')

fastify.register(plugin, { config })

fastify.get('/', async function(req, reply) {
  reply.send({ env: fastify.config.get('env') })
})

fastify.listen(3001, err => {
  if (err) {
    fastify.log.error(err)
  }
})
