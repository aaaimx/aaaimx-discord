/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
require('dotenv').config()

// Extract the required classes from the discord.js module
const { Client } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN)

module.exports = {
  client
}
