const program = require('commander')
let pkg = require('../package.json')

program.version(pkg.version)
              .usage('<command> [项目名称]')
              .command('init', '创建新项目')
              .parse(process.argv) // 解析命令行参数，参数定义完成后才能调用