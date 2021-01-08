const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { Client } = require('discord.js')

const { getAllMembers, getAllRoles, longDate } = require('../../src/utils')
const { getChannel } = require('../../src/helpers')
const { BOT_CHANNEL_ID } = require('../../src/constants')

/* GET Discord server members */
router.get('/members', async (req, res, next) => {
  const client = new Client()
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const members = await getAllMembers(client)
    res.send({
      total: members.length,
      members
    })
  })
})

/* GET Discord server roles */
router.get('/roles', async (req, res, next) => {
  const client = new Client()
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)
    const roles = await getAllRoles(client)
    res.send({ total: roles.length, roles })
  })
})

/* POST message to BOT channel */
router.post('/messages/channel', async (req, res, next) => {
  const client = new Client()
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const channel = await getChannel(client, BOT_CHANNEL_ID)
    channel.send(req.body.message)
    res.send(channel)
  })
})

/* POST event created or updated */
router.post('/messages/events/reminder', async (req, res, next) => {
  const event = req.body
  const client = new Client()
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const channel = await getChannel(client, BOT_CHANNEL_ID)
    const embed = {
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
          value: `${longDate(event.date_start)} - ${longDate(event.date_end)}`
        },
        {
          name: 'Disponibilidad',
          value: event.open_to_public
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
          value: event.division ? event.division.name : 'AAAIMX',
          inline: true
        },
        {
          name: 'Actividades requeridas',
          value: `
          - Flyer
          - Certificados
          - Publicar en Discord (**#events**) y 24 hrs después en redes sociales (**Faceboook**, **Instagram**, ...)
          - **24 hrs antes** del evento enviar correos de confirmación
          - Exportar la **lista de asistentes** y enviarsela al tallerista
          `
        }
      ],
      timestamp: new Date(),
      footer: {
        text: 'Recordatorio de Evento',
        icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png'
      }
    }
    channel.send({ embed })
    res.send(channel)
  })
})

/* POST certificate created or updated */
router.post('/messages/certificates/new', async (req, res, next) => {
  const certificate = req.body
  const client = new Client()
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    console.log('Logged as AAAIMX!')
    const channel = await getChannel(client, BOT_CHANNEL_ID)
    const embed = {
      color: 0xd9ad26,
      title: `CERTIFICATE OF ${certificate.type} | ${certificate.to}`,
      url: 'https://www.aaaimx.org/certificates/?id=' + certificate.uuid,
      author: {
        name: 'AAAIMX Event Manager',
        icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png',
        url: 'https://aaaimx.github.io/aaaimx-admin/#/'
      },
      description: certificate.description,
      fields: [
        {
          name: 'Fecha',
          value: new Date(certificate.created_at).toLocaleDateString(),
          inline: true
        },
        {
          name: 'Estado',
          value: certificate.published ? 'Online' : 'Draft',
          inline: true
        },
        {
          name: 'Evento',
          value: certificate.event ? certificate.event.title : 'No indicado',
          inline: true
        }
      ],
      image: {
        url: certificate.file
      },
      timestamp: new Date(),
      footer: {
        text: 'ID: ' + certificate.uuid,
        icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png'
      }
    }
    channel.send({ embed })
    res.send(channel)
  })
})

module.exports = router
