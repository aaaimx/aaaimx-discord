/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
require('dotenv').config()

// Extract the required classes from the discord.js module
const { Client, MessageAttachment } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()

const { getNickname, createCSV } = require('./utils')
const { getMembership, baseURL } = require('./api')

// important vars
let assistanceList = false
let assistances = []

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

client.on('message', async msg => {
  if (msg.channel.type === 'dm' && msg.author.id !== '746607629031440405') {
    if (/startList/.test(msg.content)) {
      assistanceList = true
      client.channels.cache
        .find(ch => ch.name === 'bot')
        .send(
          'Inicia pase de **lista**.\nPor favor, escribe tu **nombre completo** en un solo mensaje'
        )
    } else if (/stopList/.test(msg.content)) {
      console.log(assistances)
      assistanceList = false
      const buffer = await createCSV(assistances)
      const attachment = new MessageAttachment(buffer, './asistencia.csv')
      msg.reply(attachment)
      assistances = []
    }
  }
  if (
    assistanceList &&
    msg.channel.name === 'bot' &&
    msg.author.id !== '746607629031440405'
  ) {
    const date = new Date(msg.createdTimestamp)
    const person = { date: date.toLocaleString(), name: msg.content }
    assistances.push(person)
  }
  if (msg.channel.name === 'bot') {
    if (/getMembership/.test(msg.content)) {
      let nickname, id, avatar
      let userMentioned = msg.mentions.users.first()
      if (!userMentioned) {
        nickname = getNickname(client, msg.author)
        id = msg.author.id
        avatar = msg.author.avatarURL()
      } else {
        nickname = getNickname(client, userMentioned)
        id = userMentioned.id
        avatar = userMentioned.avatarURL()
      }
      await getMembership({
        nickname,
        avatar,
        id
      })
      const attachment = new MessageAttachment(
        `${baseURL}/media/membership.jpg`
      )
      msg.reply(attachment)
    }
  }
})

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN)

module.exports = {
  client
}