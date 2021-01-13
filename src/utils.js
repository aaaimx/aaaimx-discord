/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
const ObjectsToCsv = require('objects-to-csv')
// Import the native fs module
const fs = require('fs')
const { GUILD_ID } = require('./constants')

/**
 *
 * @param {Client} client Discord Client instance
 */
function getAllMembers (client) {
  // Get the Guild and store it under the variable "list"
  const guild = client.guilds.cache.get(GUILD_ID)
  const list = []
  // Iterate through the collection of GuildMembers from the Guild getting the username property of each member
  // Fetch a single member without checking cache

  return new Promise((res, rej) => {
    guild.members.fetch({ force: true }).then(members => {
      members.forEach(member => {
        // console.log(member.nickname || member.displayName)
        const { nickname, displayName, id } = member
        const roles = member.roles.cache.map(role => role.name)
        list.push({
          id,
          avatar: member.user.displayAvatarURL(),
          name: nickname || displayName,
          username: member.user.username,
          dateJoined: new Date(member.joinedTimestamp).toLocaleDateString(),
          roles
        })
      })
      res(
        list
          .sort((a, b) => compare(b.roles.length, a.roles.length))
          .filter(m => !m.roles.includes('Bot'))
      )
    })
  })
}

function getAllRoles (client) {
  // Get the Guild and store it under the variable "list"
  return new Promise((resolve, reject) => {
    client.guilds.fetch(GUILD_ID, { force: true }).then(guild => {
      // Iterate through the collection of GuildMembers from the Guild getting the username property of each member
      const roles = guild.roles.cache.sort((a, b) => compare(a.id, b.id))
      resolve(
        roles.map(r => {
          return {
            name: r.name,
            color: r.hexColor,
            position: r.position,
            rawPosition: r.rawPosition
          }
        })
      )
    })
  })
}

function kickMembers (client, user) {
  return new Promise((resolve, reject) => {
    client.guilds.fetch(GUILD_ID, { force: true }).then(guild => {
      guild.members
        .fetch({
          user
        })
        .then(members => {
          const promises = members.map(m => m.kick())
          Promise.all(promises).then(res => resolve(res))
        })
        .catch(console.error)
    })
  })
}

/**
 * Get user nickname (apodo)
 * @param {Client} client Discord Client instance
 * @param {User} user
 */
function getNickname (client, user) {
  let guild = client.guilds.cache.get(GUILD_ID)
  member = guild.member(user)
  return member ? member.displayName : user.username
}

function compare (a, b) {
  if (a > b) return 1
  if (a < b) return -1
  // a must be equal to b
  return 0
}

function longDate (date) {
  var event = new Date(date)
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: false
  }
  return event.toLocaleString('es-MX', options)
}

/**
 *
 * @param {Array} elements
 */
async function createCSV (elements, fileName) {
  // If you use "await", code must be inside an asynchronous function:

  const csv = new ObjectsToCsv(elements)

  // Save to file:
  await csv.toDisk(fileName) // , { append: true }

  // Return the CSV file as string:
  const text = await csv.toString()

  // Get the buffer from the 'asistencia.csv', assuming that the file exists
  const buffer = fs.readFileSync(fileName)

  return buffer
}

module.exports = {
  longDate,
  createCSV,
  getNickname,
  getAllMembers,
  getAllRoles,
  kickMembers
}
