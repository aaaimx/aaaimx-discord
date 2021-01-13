const { getNickname } = require('../utils')

function getMembership (message, client) {
  let nickname, id, avatar
  let userMentioned = message.mentions.users.first()
  if (!userMentioned) {
    nickname = getNickname(client, message.author)
    id = message.author.id
    avatar = message.author.avatarURL()
  } else {
    nickname = getNickname(client, userMentioned)
    id = userMentioned.id
    avatar = userMentioned.avatarURL()
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
    description: '@' + message.author.username,
    thumbnail: {
      url: avatar
    },
    fields: [
      {
        name: 'ID',
        value: message.author.id
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
  message.reply({ embed })
}

module.exports = {
  getMembership
}
