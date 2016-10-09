var helpers = require('helpers')

var foreman = {
  deleteDeadCreeps: function () {
    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }
  },

  extensionsAllowed: function (level) {
    return CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][level]
  },

  run: function (room) {
    var extensions = room.find(FIND_MY_STRUCTURES, {
      filter: (structure) => { return structure.structureType == STRUCTURE_EXTENSION }
    })

    var extensionsUnderConstruction = room.find(FIND_MY_CONSTRUCTION_SITES, {
      filter: (site) => { return site.structureType == STRUCTURE_EXTENSION }
    })

    var extensionsNeeded = this.extensionsAllowed(room.controller.level) - extensions.length - extensionsUnderConstruction.length
    if (extensionsNeeded > 0) {
      var spawn = room.find(FIND_MY_SPAWNS)[0]
      var spaces = room.lookForEmptyTerrainAround(spawn.pos.x, spawn.pos.y, 2)

      _.forEach(spaces, (space) => {
        console.log(`Create extension construction site at [${space.x}, ${space.y}]`)
        room.createConstructionSite(space.x, space.y, STRUCTURE_EXTENSION)
      })
    }
  }
}

module.exports = foreman
