import es6require from '../src/main'
import path from 'path'
import test from 'tape'

test('non-existing module path', t => {
  let es6module = es6require(path.join(process.cwd(), 'i-do-not-exist.js'))
  t.equal(es6module, undefined)
  t.end()
})

test('require module with ES6 class', t => {
  let TestClass = es6require(path.join(process.cwd(), 'test', 'test-class.js'))
  let testObj = new TestClass()
  t.equal(testObj.hello(), 'hello')
  t.end()  
})
