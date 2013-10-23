'use strict';
var util = require('util');
var rimraf = require('rimraf');
var child_process = require('child_process');
var spawn = child_process.spawn;
var yeoman = require('yeoman-generator');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.files = function files() {
  var command, child;
  command = 'sails generate model ' + this.name;

  console.log(command);

  var self = this;

  child = child_process.exec(command, function (error, stdout, stderr) {
    if (error) {
       console.log(error.stack);
       console.log('Error code: '+error.code);
       console.log('Signal received: '+error.signal);
    }
    if (stdout) {
      console.log('Sails model ' + self.name + ' created successfully :)');
    }
  });

  child.on('exit', function (code) {
    if (code != 0)
      console.log('Child process exited with exit code '+code);
  });  
};