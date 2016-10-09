var helpers = require('helpers')

var foreman = {
  /**
   * Creates construction sites for up to the allowed number of extensions in a room.
   *
   * @param {Room} room Room to create extensions in
   */
  createExtensions: function (room) {
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
  },

  /**
   * Delete all dead creeps from memory.
   */
  deleteDeadCreeps: function () {
    for(var name in Memory.creeps) {
      if(!Game.creeps[name]) {
        delete Memory.creeps[name];
        console.log('Clearing non-existing creep memory:', name);
      }
    }
  },

  /**
   * Gets the allowed number of extensions based on a room's controller level.
   *
   * @param  {Number} level Level of the room's controller.
   * @return {Number} Number of extensions allowed in the room.
   */
  extensionsAllowed: function (level) {
    return CONTROLLER_STRUCTURES[STRUCTURE_EXTENSION][level]
  },

  /**
   * Examines the room state and performs any necessary tasks.
   *
   * @param  {Room} room Room to supervise.
   */
  run: function (room) {
    this.createExtensions(room)
  }
}

module.exports = foreman
