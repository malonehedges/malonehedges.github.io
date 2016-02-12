#!/usr/bin/env node
var surge = require('surge')({ default: 'publish' })

var domain = 'malone.io'

var cmd = '--project ./public --domain ' + domain

// The test has run at this point, compiling roots
// so we can go ahead and publish
surge(cmd.split(' '))
