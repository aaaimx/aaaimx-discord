/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
require('dotenv').config()

// Extract the required classes from the discord.js module
const { Client, MessageAttachment } = require('discord.js')
const ObjectsToCsv = require('objects-to-csv')
// Import the native fs module
const fs = require('fs')

// Create an instance of a Discord client
const client = new Client()

// important vars
let assistanceList = false
let assistances = []
const fileName = './asistencia.csv'

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome')
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  setTimeout(() => {
    channel.send(
      `¡Hola ${member}, bienvenid@ a **AAAIMX**! Por favor escribe tu nombre completo y/o cambia tu **apodo** por tu primer nombre y un apellido.`
    )
  }, 1000)
})

client.on('message', msg => {
  if (msg.channel.type === 'dm' && msg.author.id !== '746607629031440405') {
    // msg.reply('**AAAIMX**')
    if (/!lista/.test(msg.content)) {
      assistanceList = true
      client.channels.cache
        .find(ch => ch.name === 'bot')
        .send(
          'Inicia pase de **lista**.\nPor favor, escribe tu **nombre completo** en un solo mensaje'
        )
    } else if (/!stop/.test(msg.content)) {
      console.log(assistances)
      assistanceList = false

      // If you use "await", code must be inside an asynchronous function:
      ;(async () => {
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
        const attachment = new MessageAttachment(buffer, 'asistencia.csv')
        msg.reply(text, attachment)
        assistances = []
      })()
    }
  }
  if (assistanceList && msg.channel.name === 'bot' && msg.author.id !== '746607629031440405') {
    const date = new Date(msg.createdTimestamp)
    const person = { date: date.toLocaleString(), name: msg.content }
    console.log(person)
    assistances.push(person)
  }
})

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN)
