const {colors, managers, commandsMap} = require('./constants');
const {logger, logInfo, logError} = require("./logger");
const {itemWithDescription} = require("./utils");



const { spawn } = require('node:child_process')
const fs = require('node:fs');

const getInfoContent = () => {
  logInfo('APM currently works with Npm, Yarn and Pnpm.')
  logInfo('')
  logInfo('APM has the following API:')
  logger(itemWithDescription('› add', 'adds dependencies. Uses "install" command for npm.'))
  logger(itemWithDescription('› dlx', 'works like "npx" across all package managers'))
  logger(itemWithDescription('› install', 'installs packages'))
  logger(itemWithDescription('› run', 'Runs a script. Consistent across all managers.'))
  logger(itemWithDescription('› uninstall', 'uninstall command. Uses "remove" for yarn.'))
  logger(itemWithDescription('› update', 'Update command. Uses "upgrade" for yarn.'))
  logInfo('')
  logInfo('All other commands the above will be passed to the underlying package manager.')
}

const getManager = () => {
  if (fs.existsSync('package-lock.json')) {
    return managers.npm
  }
  if (fs.existsSync('pnpm-lock.yaml')) {
    return managers.pnpm
  }
  if (fs.existsSync('yarn.lock')) {
    return managers.yarn
  }
  return false
}
const logCommand = (manager, arguments) => {
  const commandToExecute = removeWhiteSpace([manager, arguments.join(' ')].join(' '))
  logStatus('running', commandToExecute)
}

const init = (args) => {
  if (args.length === 0) {
    logInfo('Run "apm --help" for available commands.')
    return false
  }

  if (args[0] === '--help') {
    getInfoContent()
    return false
  }

  const pm = getManager()

  if (!pm) {
    logError('No supported package manager found in project')
    return false
  }

  return pm
}
const run = (args) => {
  const pm = init(args)

  if (!pm) {
    return
  }

  logStatus('package manager', pm)

  const [pmExec, argsAfterHandleNpx] = handleNpx(pm, args)
  const [cmd, argsAfterGetCommand] = getCommand(pmExec, argsAfterHandleNpx)
  const arguments = removeEmpty([cmd, ...(argsAfterGetCommand ?? [])])
  execAndLog(pmExec, arguments)
}

module.exports = {
  run,
}
