const { WELCOME_CHANNEL_ID, WELCOME_MESSAGE } = require('../constants')
const { getChannel } = require('../helpers')

async function onGuildMemberAdd (member, client) {
  // Send the message to a designated channel on a server:
  const channel = await getChannel(client, WELCOME_CHANNEL_ID)
  // Do nothing if the channel wasn't found on this server
  if (!channel) return
  // Send the message, mentioning the member
  channel.send(`¡Hola ${member}, bienvenid@ a **AAAIMX**! ${WELCOME_MESSAGE}.`)
}

module.exports = {
  onGuildMemberAdd
}
