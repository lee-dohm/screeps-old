var roleUpgrader = {
  /** @param {Creep} creep **/
  run: function(creep) {
    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false
      creep.say('harvesting')
    }

    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true
      creep.say('upgrading')
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
        creep.moveTo(creep.room.controller)
      }
    } else {
      var source = creep.pos.findClosestByRange(FIND_SOURCES)

      if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.room.createConstructionSite(creep.pos, STRUCTURE_ROAD)
        creep.moveTo(source)
      }
    }
  }
}

module.exports = roleUpgrader
