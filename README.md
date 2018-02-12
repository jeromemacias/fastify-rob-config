# fastify-rob-config

Fastify Rob-Config integration

[![Current Version](https://img.shields.io/npm/v/fastify-rob-config.svg)](https://www.npmjs.com/package/fastify-rob-config)
[![Build Status](https://travis-ci.org/jeromemacias/fastify-rob-config.svg?branch=master)](https://travis-ci.org/jeromemacias/fastify-rob-config)

## Install
```
npm i fastify-rob-config
```
## Usage

First, initialize your configuration and schema file: https://github.com/jeromemacias/node-rob-config#rob-config

```js
const fastify = require('fastify')()

fastify.register(require('fastify-rob-config'))

fastify.get('/', async function (req, reply) {
  reply.send({ env: fastify.config.get('env') })
})

fastify.listen(3000, err => {
  if (err) {
    fastify.log.error(err)
  }
})
```

### Credits

- [convict](https://github.com/mozilla/node-convict) Featureful configuration management library for Node.js 
