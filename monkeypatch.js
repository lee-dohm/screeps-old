var helpers = require('helpers')

Room.prototype.lookForAround = function (what, x, y, distance) {
  var top = y - distance
  var left = x - distance
  var bottom = y + distance
  var right = x + distance

  return this.lookForAtArea(what, top, left, bottom, right, true)
}

Room.prototype.lookForEmptyTerrainAround = function (x, y, distance) {
  var top = y - distance
  var left = x - distance
  var bottom = y + distance
  var right = x + distance

  var spaces = this.lookAtArea(top, left, bottom, right, true)
  return _.filter(spaces, (space) => {
    if (space.type == 'terrain' && this.lookAt(space.x, space.y).length == 1) {
      return true
    }
  })
}
