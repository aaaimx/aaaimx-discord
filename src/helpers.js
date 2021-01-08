const { GUILD_ID } = require('./constants')

async function getChannel (client, channel_id) {
  try {
    const channel = await client.channels.fetch(channel_id, false, true)
    return channel
  } catch (error) {
    return null
  }
}

async function getGuild (client) {
  try {
    const guild = await client.guilds.fetch(GUILD_ID, { force: true })
    return guild
  } catch (error) {
    return null
  }
}


module.exports = {
  getChannel,
  getGuild
}
