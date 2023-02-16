#! /usr/bin/env node

const fs = require('node:fs');
const {itemWithDescription} = require('./utils');
const {logger} = require('./logger');

fs.readFile('./package.json', 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const {scripts} = JSON.parse(data)

  Object.entries(scripts).forEach(([key, value]) => {
    logger(itemWithDescription(`› ${key}`, value))
  })

})


