var helpers = {
  dump: function (obj) {
    console.log(JSON.stringify(obj, undefined, 2))
  },

  lookForAround: function (room, what, x, y, distance) {
    var top = y - distance
    var left = x - distance
    var bottom = y + distance
    var right = x + distance

    return room.lookForAtArea(what, top, left, bottom, right, true)
  }
}

module.exports = helpers
