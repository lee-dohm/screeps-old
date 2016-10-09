var helpers = require('helpers')

var foreman = {
  run: function (room) {
    var extensions = room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => { return structure.structureType == STRUCTURE_EXTENSION }
    })

    var extensionsUnderConstruction = room.find(FIND_MY_CONSTRUCTION_SITES, {
      filter: (site) => { return site.structureType == STRUCTURE_EXTENSION }
    })

    var extensionsNeeded = this.extensionsAllowed(room.controller.level) - extensions.length - extensionsUnderConstruction.length
    if (extensionsNeeded > 0) {
      console.log('Extensions needed = ' + extensionsNeeded)
      var spawn = room.find(FIND_MY_SPAWNS)[0]
      var spaces = helpers.lookForAround(room, LOOK_TERRAIN, spawn.pos.x, spawn.pos.y, 2)

      for (var space in spaces) {
        if (spaces[space].type === LOOK_TERRAIN && spaces[space].terrain === 'plain') {
          room.createConstructionSite(spaces[space].x, spaces[space].y, STRUCTURE_EXTENSION)
          return
        }
      }
    }
  },

  extensionsAllowed: function (level) {
    console.log('Extensions allowed = ' + CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][level])
    return CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][level]
  }
}

module.exports = foreman
