'use strict'
require('dotenv').config()

/**
 * A bot that welcomes new guild members when they join
 */

// Import the discord.js module
const { Client } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!')
})

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(ch => ch.name === 'general')
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  channel.send(
    `¡Hola ${member}, bienvenido a **AAAIMX**! Por favor escribe tu nombre completo`
  )
})

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN)
