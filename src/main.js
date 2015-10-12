import fs from 'fs'
import path from 'path'
let babel = require('babel')

// https://github.com/joyent/node/blob/master/lib/module.js
// http://stackoverflow.com/questions/17581830/load-node-js-module-from-string-in-memory

export default function es6require(modulePath, babelOptions) {
  modulePath = path.resolve(modulePath)
  if (fs.existsSync(modulePath)) {
    let code = babel.transformFileSync(modulePath, babelOptions).code
    let pathModule = new module.constructor()

    let localModulesPath = path.join(process.cwd(), 'node_modules')

    if ((pathModule.paths || []).indexOf(localModulesPath) == -1) {
      pathModule.paths = [localModulesPath].concat(pathModule.paths)
    }

    pathModule._compile(code, modulePath)
    return pathModule.exports
  }
}

// TODO:

// if (typeof(content) === 'object' && typeof(content['default']) === 'function') {
//   description = content['description']
//   args = content['args'] || ''
//   alias = content['alias']
//   content = content['default']
// }
