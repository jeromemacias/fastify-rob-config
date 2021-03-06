'use strict'

const t = require('tap')
const Fastify = require('fastify')
const fastifyEnv = require('./index')
const exampleConfig = require('rob-config')

function makeTest(
  t,
  asProperties,
  config,
  confKey,
  isOk,
  confExpected,
  errorMessage
) {
  t.plan(isOk ? 2 : 1)

  const fastify = Fastify()
  fastify
    .register(fastifyEnv, {
      confKey,
      asProperties,
      config
    })
    .ready((err) => {
      if (isOk) {
        t.notOk(err)
        t.strictSame(fastify[confKey || 'config'], confExpected)
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
  },
  {
    name: 'simple ok',
    config: exampleConfig,
    confKey: 'customConfig',
    asProperties: true,
    isOk: true,
    confExpected: {
      env: 'development',
      port: 3001
    }
  },
  {
    name: 'require ok',
    asProperties: true,
    isOk: true,
    confExpected: {
      env: 'development',
      port: 3001
    }
  }
]

tests.forEach(function (testConf) {
  t.test(testConf.name, (t) => {
    makeTest(
      t,
      testConf.asProperties,
      testConf.config,
      testConf.confKey,
      testConf.isOk,
      testConf.confExpected,
      testConf.errorMessage
    )
  })
})

t.test('Validation error', (t) => {
  makeTest(
    t,
    true,
    exampleConfig.set('port', 'error'),
    null,
    false,
    null,
    '[rob-config] port: ports must be within range 0 - 65535'
  )
})
