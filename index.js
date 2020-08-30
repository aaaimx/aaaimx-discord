/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
require('dotenv').config()

const Discord = require('discord.js')
const client = new Discord.Client()

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
    msg.reply('**AAAIMX**')
    client.channels.cache.find(ch => ch.name === 'bot').send(msg)
  }
})

// Log our bot in using the token from https://discord.com/developers/applications
client.login(process.env.TOKEN)
