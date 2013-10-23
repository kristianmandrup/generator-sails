'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.files = function files() {
  var command, child;
  command = 'sails new controller ' + this.name;

  console.log(command);

  child = child_process.exec(command, function (error, stdout, stderr) {
    if (error) {
       console.log(error.stack);
       console.log('Error code: '+error.code);
       console.log('Signal received: '+error.signal);
    }
    if (stdout) {
      console.log('Sails controller ' + this.name + ' created successfully :)');
    }
  });

  child.on('exit', function (code) {
    console.log('Child process exited with exit code '+code);
  });  
};