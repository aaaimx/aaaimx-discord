const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { Client, MessageEmbed } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()

const { getAllMembers, getAllRoles } = require('../../src/utils')
const { getChannel } = require('../../src/helpers')
const { BOT_CHANNEL_ID } = require('../../src/constants')

/* GET home page. */
router.get('/members', async (req, res, next) => {
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const members = await getAllMembers(client)
    res.send({
      total: members.length,
      members
    })
  })
})

/* GET home page. */
router.get('/roles', async (req, res, next) => {
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)
    const roles = await getAllRoles(client)
    res.send({ total: roles.length, roles })
  })
})

/* GET home page. */
router.post('/messages/channel', async (req, res, next) => {
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const channel = await getChannel(client, BOT_CHANNEL_ID)
    channel.send(req.body.message)
    res.send(channel)
  })
})

/* GET home page. */
router.post('/messages/events/reminder', async (req, res, next) => {
  const event = req.body
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const channel = await getChannel(client, BOT_CHANNEL_ID)
    const exampleEmbed = {
      color: 0xd9ad26,
      title: event.title,
      url: 'https://aaaimx.github.io/aaaimx-admin/#/events/' + event.id,
      author: {
        name: 'AAAIMX Event Manager',
        icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png',
        url: 'https://aaaimx.github.io/aaaimx-admin/#/'
      },
      description: event.description,
      fields: [
        {
          name: 'Fechas',
          value: event.date_start + event.date_end
        },
        {
          name: 'Disponibilidad',
          value:
            event.corum === 0 && event.open_to_public
              ? 'Abierto al público'
              : event.corum + ' personas',
          inline: true
        },
        {
          name: 'Horas para CC',
          value: event.hours,
          inline: true
        },
        {
          name: 'Tipo de evento',
          value: event.type || 'No establecido',
          inline: true
        },
        {
          name: 'Division',
          value: event.division || 'AAAIMX',
          inline: true
        },
        {
          name: 'Actividades requeridas',
          value: `
          - Flyer
          - Certificados
          - Publicar en Discord y 24 hrs despues en redes sociales (Faceboook, Instagram, ...)
          `
        }
      ],
      timestamp: new Date(),
      footer: {
        text: '7 días restan para el evento',
        icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png'
      }
    }
    channel.send({ embed: exampleEmbed })
    res.send(channel)
  })
})

module.exports = router
