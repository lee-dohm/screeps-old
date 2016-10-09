require('monkeypatch')

var construct = require('construct')
var foreman = require('foreman')
var helpers = require('helpers')
var roleHarvester = require('role.harvester')
var roleUpgrader = require('role.upgrader')
var roleBuilder = require('role.builder')

module.exports.loop = function () {
  console.log(`Time = ${Game.time}`)

  foreman.deleteDeadCreeps()

  construct('harvester', 2)
  construct('builder', 2)
  construct('upgrader', 2)

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
