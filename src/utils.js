/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
const ObjectsToCsv = require('objects-to-csv')
// Import the native fs module
const fs = require('fs')
const FILE_NAME = './asistencia.csv'
const GUILD_ID = '717803240959246497'

/**
 *
 * @param {Client} client Discord Client instance
 */
function getAllMembers (client, role) {
  // Get the Guild and store it under the variable "list"
  const guild = client.guilds.cache.get(GUILD_ID)
  const list = []
  // Iterate through the collection of GuildMembers from the Guild getting the username property of each member
  guild.members.cache.forEach(member => {
    // console.log(member.nickname || member.displayName)
    const { nickname, displayName, id } = member
    const roles = member.roles.cache.map(role => role.name)
    list.push({
      id,
      avatar: member.user.avatarURL(),
      name: nickname || displayName,
      username: member.user.username,
      dateJoined: new Date(member.joinedTimestamp).toLocaleDateString(),
      roles
    })
  })
  return list
    .sort((a, b) => compare(b.roles.length, a.roles.length))
    .filter(m => !m.roles.includes('Bot'))
}

function getAllRoles (client) {
  // Get the Guild and store it under the variable "list"
  const guild = client.guilds.cache.get(GUILD_ID)
  // Iterate through the collection of GuildMembers from the Guild getting the username property of each member
  const roles = guild.roles.cache.sort((a, b) => compare(a.id, b.id))
  return roles.map(r => {
    return {
      name: r.name,
      color: '#' + Math.floor(Math.random() * r.color).toString(16)
    }
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

/**
 *
 * @param {Array} elements
 */
async function createCSV (elements, fileName = FILE_NAME) {
  // If you use "await", code must be inside an asynchronous function:

  const csv = new ObjectsToCsv(elements)

  // Save to file:
  await csv.toDisk(fileName) // , { append: true }

  // Return the CSV file as string:
  const text = await csv.toString()

  // Get the buffer from the 'asistencia.csv', assuming that the file exists
  const buffer = fs.readFileSync(fileName)

  /**
   * Create the attachment using MessageAttachment,
   * overwritting the default file name to 'memes.txt'
   * Read more about it over at
   * http://discord.js.org/#/docs/main/master/class/MessageAttachment
   */
  return buffer
}

module.exports = {
  createCSV,
  getNickname,
  getAllMembers,
  getAllRoles
}
