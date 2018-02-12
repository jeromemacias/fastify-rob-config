module.exports = {
  env: {
    doc: 'The applicaton environment.',
    format: ['production', 'staging', 'integration', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The server port',
    format: 'port',
    default: 3000
  }
}
