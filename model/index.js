'use strict';
var util = require('util');
var rimraf = require('rimraf');
var child_process = require('child_process');
var spawn = child_process.spawn;
var yeoman = require('yeoman-generator');
var fs = require('fs');
var _s = require('underscore.string');

var ModelGenerator = module.exports = function ModelGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(ModelGenerator, yeoman.generators.NamedBase);

ModelGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var types = ['string', 'text', 'integer', 'float', 'date', 
           'time', 'datetime', 'boolean', 'binary', 'array', 'json'];


  console.log('types: ' + types.join(' '));

  var prompts = [{
      name: 'attributeList',
      message: 'Please specify attributes name:type',
  }];

  this.prompt(prompts, function (props) {
      // `props` is an object passed in containing the response values, named in
      // accordance with the `name` property from your prompt object. So, for us:
      this.attributeList = props.attributeList;
      console.log('prompt actions', this.attributeList);

      cb();
  }.bind(this));
};

ModelGenerator.prototype.removeFile = function removeDir () {
  var file = './api/models/' + _s.classify(this.name) + '.js';
  // console.log('removing model: ' + file);
  var self = this;

  var deleteExistingModel = function() {
    fs.unlink(file, function (err) {
      if (err) console.log(err);
      console.log('Deleted old model: ' + self.name);
    });    
  };

  fs.exists(file, function (exists) {
    deleteExistingModel();
  });
};


ModelGenerator.prototype.files = function files() {
  var command, child;

  console.log('attributes', this.attributeList);

  command = 'sails generate model ' + this.name + ' ' + this.attributeList;

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