  // Persistent adapter for DEVELOPMENT ONLY
  // (data IS preserved when the server shuts down)
  // PLEASE NOTE: disk adapter not compatible with node v0.10.0 currently 
  //        because of limitations in node-dirty
  //        See https://github.com/felixge/node-dirty/issues/34
module.exports = disk: {
  module: 'sails-dirty',
  filePath: './.tmp/dirty.db',
  inMemory: false
}