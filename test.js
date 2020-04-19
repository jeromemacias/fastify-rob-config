'use strict'

const t = require('tap')
const Fastify = require('fastify')
const fastifyEnv = require('./index')
const exampleConfig = require('rob-config')

function makeTest(t, asProperties, config, isOk, confExpected, errorMessage) {
  t.plan(isOk ? 2 : 1)

  const fastify = Fastify()
  fastify
    .register(fastifyEnv, {
      confKey: 'config',
      asProperties: asProperties,
      config: config
    })
    .ready(err => {
      if (isOk) {
        t.notOk(err)
        t.strictSame(fastify.config, confExpected)
        return
      }

      t.strictSame(err.message, errorMessage)
    })
}

const tests = [
  {
    name: 'simple ok',
    config: exampleConfig,
    asProperties: true,
    isOk: true,
    confExpected: {
      env: 'development',
      port: 3001
    }
  }
]

tests.forEach(function (testConf) {
  t.test(testConf.name, t => {
    makeTest(
      t,
      testConf.asProperties,
      testConf.config,
      testConf.isOk,
      testConf.confExpected,
      testConf.errorMessage
    )
  })
})
