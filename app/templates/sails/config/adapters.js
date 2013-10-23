module.exports.adapters = {
  'default': 'mongo',
  memory: require('./adapters/memory'),
  disk: require('./adapters/disk'),
  mongo: require('./adapters/mongo'),
  mysql: require('./adapters/mysql')
}

