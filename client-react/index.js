/*
 * generator-xrm
 * https://github.com/BclEx/generator-xrm
 *
 * Copyright (c) 2015 Sky Morey, contributors
 * Licensed under the MIT license.
 */

'use strict';

// External libs.
var util = require('util');
var scriptBase = require('../script-base.js');
var yeoman = require('yeoman-generator');
var debug = require('debug')('generator:xrm');
var chalk = require('chalk');
var Location = require('../util').Location;
var _ = require('lodash');
var Theme = require('../theme-slds-react');

var Generator = module.exports = function Generator() {
    this._moduleName = 'xrm:client-react';
    scriptBase.apply(this, arguments);
    var done = this.async();
    this.on('end', function () {
        done();
    });
};
util.inherits(Generator, scriptBase);

var Home = require('./index/home');
var Form = require('./index/form');
var List = require('./index/list');
var Lookup = require('./index/lookup');
var QuickFind = require('./index/quick-find');
var Record = require('./index/record');
var View = require('./index/view');
var NewWindow = require('./index/new-window');
var Service = require('./index/service');

Generator.prototype.createFiles = function createFiles() {
    debug('Defining client');
    var ctx = this.options.ctx;

    // ctx
    var entityName = ctx.name = ctx.name || 'entity';
    var fields = ctx.fields;
    if (!Array.isArray(fields)) {
        this.log(chalk.bold('ERR! ' + chalk.green('{ fields: }') + ' not array')); return null;
    }

    // build content
    var theme = new Theme(entityName, this.log);
    //theme.buildAllElements(s, fields);

    var location = this.location || { html: null, js: null, css: null };
    var locationJs = location.js || new Location();
    var s0 = [[], []];
    Home.build.call(this, s0, theme, ctx);
    var jsCtx = {
        _name: entityName,
        _file: locationJs.getEnsuredPath('src/' + entityName, entityName + 'Home.js'),
        js: { append: s0[0] }
    };
    var children = jsCtx._children = [];
    var s1 = [[], []];
    Form.build.call(this, s1, theme, ctx);
    children.push({
        _file: locationJs.getEnsuredPath('src/' + entityName, entityName + 'Form.js'),
        js: { append: s1[0] }
    });
    var s2 = [[], []];
    List.build.call(this, s2, theme, ctx);
    children.push({
        _file: locationJs.getEnsuredPath('src/' + entityName, entityName + 'List.js'),
        js: { append: s2[0] }
    });
    var s3 = [[], []];
    Lookup.build.call(this, s3, theme, ctx);
    children.push({
        _file: locationJs.getEnsuredPath('src/' + entityName, entityName + 'Lookup.js'),
        js: { append: s3[0] }
    });
    var s4 = [[], []];
    QuickFind.build.call(this, s4, theme, ctx);
    children.push({
        _file: locationJs.getEnsuredPath('src/' + entityName, entityName + 'QuickFind.js'),
        js: { append: s4[0] }
    });
    var s5 = [[], []];
    Record.build.call(this, s5, theme, ctx);
    children.push({
        _file: locationJs.getEnsuredPath('src/' + entityName, entityName + 'Record.js'),
        js: { append: s5[0] }
    });
    var s6 = [[], []];
    View.build.call(this, s6, theme, ctx);
    children.push({
        _file: locationJs.getEnsuredPath('src/' + entityName, entityName + 'View.js'),
        js: { append: s6[0] }
    });
    var s7 = [[], []];
    NewWindow.build.call(this, s7, theme, ctx);
    children.push({
        _file: locationJs.getEnsuredPath('src/' + entityName, 'New' + entityName + 'Window.js'),
        js: { append: s7[0] }
    });
    var s8 = [[], []];
    Service.build.call(this, s8, theme, ctx);
    children.push({
        _file: locationJs.getEnsuredPath('src/_services', entityName + 'Service.js'),
        js: { append: s8[0] }
    });

    this.composeWith('fragment:js', { options: { ctx: jsCtx } });
};
