var construct = function (role, count) {
  var creeps = _.filter(Game.creeps, (creep) => creep.memory.role === role)
  if (creeps.length < count) {
    var newCreep = Game.spawns['Spawn1'].createCreep([WORK, CARRY, MOVE], undefined, {role: role})
    console.log('Spawning new ' + role + ': ' + newCreep)
  }
}

module.exports = construct
