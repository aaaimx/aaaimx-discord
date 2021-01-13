const { getAllMembers } = require('../utils')

async function onKick (message, client) {
  // Ignore messages that aren't from a guild
  if (!message.guild) return

  // If the message content starts with "!kick"
  if (message.content.startsWith('!kick')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first()
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user)
      // If the member is in the guild
      if (member) {
        /**
         * Kick the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         */
        member
          .kick('Optional reason that will display in the audit logs')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully kicked ${user.tag}`)
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to kick the member')
            // Log the error
            console.error(err)
          })
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this server!")
      }
      // Otherwise, if no user was mentioned
    } else {
      const role = message.mentions.roles.first()
      // If we have a role mentioned
      if (role) {
        // Now we get the member from the role
        let members = await message.guild.members.fetch({ force: true })
        members = members.filter(member => member._roles.length === 1)
        members = members.filter(
          member => member._roles.indexOf(`${role.id}`) !== -1
        )
        const promises = members.map(member => member.kick())
        await Promise.all(promises)
        message.reply(`Successfully kicked ${role.name}`)
      } else {
        message.reply("You didn't mention the role/user to kick!")
      }
    }
  }
}

module.exports = { onKick }
