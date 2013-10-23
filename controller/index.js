'use strict';
var util = require('util');
var rimraf = require('rimraf');
var child_process = require('child_process');
var spawn = child_process.spawn;
var yeoman = require('yeoman-generator');
var fs = require('fs');
var _s = require('underscore.string');

var ControllerGenerator = module.exports = function ControllerGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ControllerGenerator, yeoman.generators.NamedBase);

ControllerGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var prompts = [{
      name: 'ctrlActions',
      message: 'Which actions do you want',
      default: ['create', 'update'],
      type: 'checkbox',
      choices: ['comment', 'create', 'read', 'update', 'destroy', 'tag', 'like']
  }];

  this.prompt(prompts, function (props) {
      // `props` is an object passed in containing the response values, named in
      // accordance with the `name` property from your prompt object. So, for us:
      this.ctrlActions = props.ctrlActions;
      console.log('prompt actions', this.ctrlActions);

      cb();
  }.bind(this));
};

ControllerGenerator.prototype.removeFile = function removeDir () {
  var file = './api/controllers/' + _s.classify(this.name) + 'Controller.js';
  // console.log('removing model: ' + file);
  var self = this;

  var deleteExistingModel = function() {
    fs.unlink(file, function (err) {
      if (err) console.log(err);
      console.log('Deleted old controller: ' + self.name);
    });    
  };

  fs.exists(file, function (exists) {
    deleteExistingModel();
  });
};


ControllerGenerator.prototype.files = function files() {
  var command, child;

  console.log('actions', this.ctrlActions);

  command = 'sails generate controller ' + this.name; + ' ' + this.ctrlActions.join(' ');


  console.log(command);

  var self = this;

  child = child_process.exec(command, function (error, stdout, stderr) {
    if (error) {
       console.log(error.stack);
       console.log('Error code: '+error.code);
       console.log('Signal received: '+error.signal);
    }
    if (stdout) {
      console.log('Sails controller ' + self.name + ' created successfully :)');
      console.log('Note: The only thing better than thin controllers is no controllers.');
    }
  });

  child.on('exit', function (code) {
    if (code != 0)
      console.log('Child process exited with exit code '+code);
  });  
};