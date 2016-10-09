Room.prototype.lookForAround = function (what, x, y, distance) {
  var top = y - distance
  var left = x - distance
  var bottom = y + distance
  var right = x + distance

  return this.lookForAtArea(what, top, left, bottom, right, true)
}
