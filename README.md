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
const fastifyRobConfig = require('fastify-rob-config')

const config = require('rob-config')
const options = {
  confKey: 'config', // optional, default: config
  asProperties: false, // if true, you will access to config.key instead of config.get('key'), default: false
  config: config // optional, default: require('rob-config')
}

fastify.register(fastifyRobConfig, options, function (err) {
   // or fastify[options.confKey].get('env')
  console.log(fastify.config.get('env'))
}))
```

### Credits

- [convict](https://github.com/mozilla/node-convict) Featureful configuration management library for Node.js 
