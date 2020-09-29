/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
const ObjectsToCsv = require('objects-to-csv')
// Import the native fs module
const fs = require('fs')
const fileName = './asistencia.csv'

/**
 * Get user nickname (apodo)
 * @param {Client} client
 * @param {User} user
 */
function getNickname (client, user) {
  let guild = client.guilds.cache.get('717803240959246497')
  member = guild.member(user)
  return member ? member.displayName : user.username
}

/**
 * 
 * @param {Array} assistances 
 */
async function getCSVAssistantList (assistances) {
  // If you use "await", code must be inside an asynchronous function:

  const csv = new ObjectsToCsv(assistances)

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
  getNickname,
  getCSVAssistantList
}
