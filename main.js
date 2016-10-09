require('monkeypatch')

const foreman = require('foreman')
const helpers = require('helpers')
const roleHarvester = require('role.harvester')
const roleUpgrader = require('role.upgrader')
const roleBuilder = require('role.builder')

module.exports.loop = function () {
  foreman.deleteDeadCreeps()

  foreman.createCreep('builder', 4)
  foreman.createCreep('harvester', 4)
  foreman.createCreep('upgrader', 4)

  _.forEach(Game.rooms, (room) => { foreman.supervise(room) })

  _.forEach(Game.creeps, (creep) => {
    if (creep.memory.role == 'builder') {
      roleBuilder.run(creep)
    }

    if (creep.memory.role == 'harvester') {
      roleHarvester.run(creep)
    }

    if (creep.memory.role == 'upgrader') {
      roleUpgrader.run(creep)
    }
  })
}
