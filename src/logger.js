const chalk = require('chalk')
const format = require('util').format

const prefix = ' paco-cli'
const sep = chalk.gray('.')

/**
 * log a message to the console
 * @param {String} message
 */
exports.log = function(...args) {
    const msg = format.apply(format, ...args)
    console.log(chalk.white(prefix), sep, msg)
}

/**
 * Log an message to the console adn exit
 * @param {String} messgae
 */
exports.fatal = function(...args) {
    if(args[0] instanceof Error) args[0] = args[0].message.trim()
    const msg = format.apply(format, args)
    console.error(chalk.red(prefix), sep, msg)
    process.exit(1)
}
/**
 * Log a success message to the console and exit
 * @param {String} messgae
 */
exports.success = function(...args) {
    const msg = format.apply(format, args)
    console.log(chalk.white(prefix), sep, msg)
}