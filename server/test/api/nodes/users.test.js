'use strict'

const plugins = require('../../lib/plugin')
const utility = require('../../lib/utility')

let BASE_PATH = '/api/nodes/users'
let userPlugin = plugins.user()

describe(BASE_PATH, function () {
  let node

  before(function* () {
    yield userPlugin.before({isAdmin: true})
    node = yield utility.createTestNodeAsync()
  })

  after(function* () {
    yield utility.removeTestNodeAsync(node)
    yield userPlugin.after()
  })

  describe('get', function () {
    it('should return user detail', function* () {
      yield api.get(BASE_PATH)
        .query({nodeId: node.nodeId})
        .use(userPlugin.plugin())
        .expect(200)
    })
  })
})
