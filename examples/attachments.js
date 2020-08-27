require('dotenv').config()

// Extract the required classes from the discord.js module
const { Client, MessageAttachment } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


client.on('message', message => {
  // If the message is '!rip'
  if (message.content === '!rip') {
    // Create the attachment using MessageAttachment
    const attachment = new MessageAttachment('https://i.imgur.com/w3duR07.png')
    // Send the attachment in the message channel
    message.channel.send(attachment)
  }
})

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN)
