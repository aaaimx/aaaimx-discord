const { GUILD_ID } = require('./constants')

async function getChannel (client, channel_id) {
  try {
    const channel = await client.channels.fetch(channel_id, false, true)
    return channel
  } catch (error) {
    return null
  }
}

async function getRoles (client) {
  try {
    const guild = await client.guilds.fetch(GUILD_ID, true)
    const roles = guild.roles.fetch()
    return roles
  } catch (error) {
    console.log(error)
    return null
  }
}

async function getAllMembers (client, query = 'A', limit = 10) {
  try {
    const guild = await client.guilds.fetch(GUILD_ID)
    // Fetch by query
    const members = await guild.members.fetch({
      query,
      force: true,
      limit
    })
    return members
  } catch (error) {
    console.log(error)
    return null
  }
}

module.exports = {
  getChannel,
  getAllMembers,
  getRoles
}
