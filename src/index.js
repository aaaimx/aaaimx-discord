/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
require('dotenv').config()

// Extract the required classes from the discord.js module
const { Client, MessageAttachment } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()

const { getNickname, createCSV } = require('./utils')
const { getChannel } = require('./helpers')
const {
  WELCOME_CHANNEL_ID,
  WELCOME_MESSAGE,
  BOT_ID,
  BOT_CHANNEL_ID,
  BOT_CHANNEL_NAME,
  BASE_URL
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
  const channel = await getChannel(client, WELCOME_CHANNEL_ID)
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  channel.send(`¡Hola ${member}, bienvenid@ a **AAAIMX**! ${WELCOME_MESSAGE}.`)
})

client.on('message', async msg => {
  if (msg.channel.name === BOT_CHANNEL_NAME) {
    if (/getMembership/.test(msg.content)) {
      let nickname, id, avatar, dateJoined
      let userMentioned = msg.mentions.users.first()
      if (!userMentioned) {
        nickname = getNickname(client, msg.author)
        id = msg.author.id
        avatar = msg.author.avatarURL()
        dateJoined = msg.author.date_joined
      } else {
        nickname = getNickname(client, userMentioned)
        id = userMentioned.id
        avatar = userMentioned.avatarURL()
        dateJoined = msg.author.date_joined
      }
      const embed = {
        color: 0xd9ad26,
        title: nickname,
        url: 'https://www.aaaimx.org/community/',
        author: {
          name: 'AAAI Student Chapter México',
          icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png',
          url: 'https://www.aaaimx.org'
        },
        description: '@' + msg.author.username,
        thumbnail: {
          url: avatar
        },
        fields: [
          {
            name: 'ID',
            value: msg.author.id
          },
          {
            name: 'Date joined',
            value: '20/12/2018',
            inline: true
          },
          {
            name: 'Birthday',
            value: '10/12/1998',
            inline: true
          }
        ],
        image: {
          url: 'https://www.aaaimx.org/img/sections-background/community.jpg'
        },
        // timestamp: new Date(),
        footer: {
          text: 'Association for Advancement of Artificial Intelligence',
          icon_url: 'https://www.aaaimx.org/img/sprites/aaai-transpeps.png'
        }
      }
      msg.reply({ embed })
    }
  }
})

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN)
