const {colors} = require('./constants');
const {logger, logInfo, logError} = require("./logger");

const { spawn } = require('node:child_process')

const logStatus = (cat, what) => {
  logger([[colors.cyan, `${cat}: `], [colors.brightCyan, what]]);
}
const itemWithDescription = (num, content) => {
  return [[colors.brightCyan, `${num}: `], [colors.yellow, content]]
}

const execCommand = (cmd, args) => {
  spawn(cmd, args, {stdio: "inherit"})
}

const removeEmpty = (arr) =>
  arr.filter(item => !!item)

const removeWhiteSpace = (str) => str.replace(/\s/g, ' ').trim()

module.exports = {
  logStatus,
  itemWithDescription,
  execCommand,
  removeEmpty,
  removeWhiteSpace,
}
