var construct = require('construct')
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
  console.log('Time = ' + Game.time)

  for(var name in Memory.creeps) {
    if(!Game.creeps[name]) {
      delete Memory.creeps[name];
      console.log('Clearing non-existing creep memory:', name);
    }
  }

  var tower = Game.getObjectById('TOWER_ID');

  if (tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
      filter: (structure) => structure.hits < structure.hitsMax
    });

    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  }

  construct('harvester', 2)
  construct('builder', 1)
  construct('upgrader', 2)

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    if(creep.memory.role == 'harvester') {
      roleHarvester.run(creep);
    }

    if(creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep);
    }

    if(creep.memory.role == 'builder') {
      roleBuilder.run(creep);
    }
  }
}
