const chalk = require('chalk')
const Metalsmith = require('metalsmith')
const Handlebars = require('handlebars')
const async = require('async')
// 模板引擎
const render = require('consolidate').handlebars.render
const path = require('path')
const multimatch = require('multimatch')
const getOptions = require('./options')
const ask = require('./ask')
const filter = require('./filter')
const logger = require('./logger')

Handlebars.registerHelper('if_eq', function (a, b, opts) {
    return a === b ? opts.fn(this) : opts.inverse(this)
})

Handlebars.registerHelper('unless_eq', function (a, b, opts) {
    return a === b ? opts.inverse(this) : opts.fn(this)
})

/**
 *generate a template given a `src` and `dest`
 *@{String} name
 * @{String} src
 * @{String} dest
 * @{Function} done
 */
module.exports = function generate (name, src, dest, done) {
    const opts = getOptions(name, src)
    const metalsmith = Metalsmith(path.join(src, 'template'))
    const data = Object.assign(metalsmith.metadata(), {
        destDirName: name,
        inPlace: dest ===  process.cwd(),
        noEscape: true
    })
    opts.helpers && Object.keys(opts.helpers).map(key => {
        Handlebars.registerHelper(key, opts.helpers[key])
    })
    const helpers = { chalk, logger }
    if (opts.metalsmith && typeof opts.metalsmith.before  === 'function') {
        opts.metalsmith.before(metalsmith, opts, before)
    }
    metalsmith.use(askQuestion(opts.prompts))
                      .use()
}

function askQuestion (prompts) {
    return (files, metalsmith, done) => {
        ask(prompts, metalsmith.metadata(), done)
    }
}