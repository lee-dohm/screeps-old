/**
 * Stores the various body descriptions for each role name.
 *
 * If there is only one entry for a role name, then that is the only body for that role. If there is
 * an array
 */
const bodyForRole = {
  builder: [[CARRY, WORK, MOVE]],
  harvester: [[CARRY, WORK, MOVE]],
  upgrader: [[CARRY, WORK, MOVE]]
}

var foreman = {
  /**
   * Create `count` creeps for the given role if the energy is available.
   *
   * @param  {String} role  Role of the creep to create.
   * @param  {Number} count Number of creeps of the given role to create.
   */
  createCreep: function (role, count) {
    var spawn = Game.spawns['Spawn1']

    if (!spawn.spawning) {
      let body = this.getBestBodyForRole(spawn, role)

      if (body) {
        var creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role)

        if (creeps.length < count) {
          var newCreep = spawn.createCreep(this.getBodyForRole(role), undefined, {role: role})
          console.log(`Spawn new ${role}: ${newCreep}`)
        }
      }
    }
  },

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
        console.log(`Delete dead creep from memory: ${name}`);
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
   * Gets the best body for the given role that can be constructed by the spawn.
   *
   * @param  {StructureSpawn} spawn Spawn to construct the creep.
   * @param  {String} role Role to retrieve the body description for.
   * @return {Array} Body description.
   */
  getBestBodyForRole: function(spawn, role) {
    let bodies = this.getBodiesForRole(role)

    return _.find(bodies, (body) => spawn.canCreateCreep(body) == OK)
  },

  /**
   * Gets the body descriptions for the given role.
   *
   * @param  {String} role Role to retrieve the body descriptions for.
   * @return {Array} Descriptions of the bodies defined for that role.
   */
  getBodiesForRole: function (role) {
    return bodyForRole[role]
  },

  /**
   * Examines the room state and performs any necessary tasks.
   *
   * @param  {Room} room Room to supervise.
   */
  supervise: function (room) {
    this.createExtensions(room)
  }
}

module.exports = foreman
