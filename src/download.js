const download = require('download-git-repo')
const path = require('path')

module.exports = function(target) {
  target = path.join(target || '.', '.down-temp')
  return new Promise (function (resolve, reject) {
    download('https://api.github.com/users/vuejs-templates/repos', target, {clone: true}, (err) => {
      if (err) {
        reject(err)
      } else {
        resolve(target)
      }
    })
  })
}