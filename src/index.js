/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
require('dotenv').config()

// Extract the required classes from the discord.js module
const { Client } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()
const { onGuildMemberAdd, getMembership, onKick } = require('./actions')

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Create an event listener for new guild members
client.on('guildMemberAdd', member => onGuildMemberAdd(member, client))

// Create an event listener for messages
client.on('message', message => {
  const command = message.content.split(' ')[0]
  switch (command) {
    case '!member':
      getMembership(message, client)
      break
    case '!kick':
      onKick(message, client)
      break
    // TODO: more actions/commands ...
    default:
      break
  }
})

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN)
