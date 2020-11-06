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
const { getChannel } = require('./helpers')
const {
  WELLCOME_CHANNEL_ID,
  BOT_CHANNEL_ID,
  BOT_ID,
  BOT_CHANNEL_NAME,
  INSTRUCTIONS
} = require('./constants')

// important vars
let assistanceList = false
let assistances = []

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Create an event listener for new guild members
client.on('guildMemberAdd', async member => {
  // Send the message to a designated channel on a server:
  const channel = await getChannel(client, WELLCOME_CHANNEL_ID)
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  channel.send(
    `¡Hola ${member}, bienvenid@ a **AAAIMX**! ${INSTRUCTIONS}.`
  )
})

client.on('message', async msg => {
  if (msg.channel.type === 'dm' && msg.author.id !== BOT_ID) {
    if (/startList/.test(msg.content)) {
      assistanceList = true
      const channel = await getChannel(client, BOT_CHANNEL_ID)
      channel.send(
        'Inicia pase de **lista**.\nPor favor, escribe tu **nombre completo** en un solo mensaje'
      )
    } else if (/stopList/.test(msg.content)) {
      console.log(assistances)
      assistanceList = false
      const buffer = await createCSV(assistances)
      /**
       * Create the attachment using MessageAttachment,
       * overwritting the default file name to 'memes.txt'
       * Read more about it over at
       * http://discord.js.org/#/docs/main/master/class/MessageAttachment
       */
      const attachment = new MessageAttachment(buffer, './asistencia.csv')
      msg.reply(attachment)
      assistances = []
    }
  }
  if (
    assistanceList &&
    msg.channel.name === BOT_CHANNEL_NAME &&
    msg.author.id !== BOT_ID
  ) {
    const date = new Date(msg.createdTimestamp)
    const person = { date: date.toLocaleString(), name: msg.content }
    assistances.push(person)
  }
  if (msg.channel.name === BOT_CHANNEL_NAME) {
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
