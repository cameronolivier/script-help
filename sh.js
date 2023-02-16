#! /usr/bin/env node

const fs = require('node:fs');
const {itemWithDescription} = require('./utils');
const {logger, logError} = require('./logger');

fs.readFile('./package.json', 'utf8', (err, data) => {
  if (err) {
    logError('No package.json found in project')
    return
  }

  const {scripts} = JSON.parse(data)

  Object.entries(scripts).forEach(([key, value]) => {
    logger(itemWithDescription(`› ${key}`, value))
  })

})


