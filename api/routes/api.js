const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { Client } = require('discord.js')

const { getAllMembers, getAllRoles, kickMembers } = require('../../src/utils')
const { getChannel } = require('../../src/helpers')
const {
  BOT_CHANNEL_ID,
  EVENTS_COMMITTEE_CHANNEL_ID,
  OUTREACH_COMMITTEE_CHANNEL_ID
} = require('../../src/constants')
const {
  generateEventDetailsEmbed,
  generateEventDescriptionEmbed,
  generateCertificateEmbed
} = require('../utils/embeds')

/* GET Discord server members */
router.get('/members', async (req, res, next) => {
  const client = new Client()
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const members = await getAllMembers(client)
    const roles = await getAllRoles(client)
    res.send({
      total: members.length,
      members,
      roles
    })
  })
})

/* POST kick multiple members by id */
router.post('/members/kick', async (req, res, next) => {
  const client = new Client()
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const users = req.body.users
    const data = await kickMembers(client, users)
    res.send(data)
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
    const embed1 = generateEventDetailsEmbed(event)
    const embed2 = generateEventDescriptionEmbed(event.description)
    if (process.env.NODE_ENV === 'development') {
      const channel = await getChannel(client, BOT_CHANNEL_ID)
      channel.send({ embed: embed1 })
      channel.send({ embed: embed2 })
    } else {
      const eventsChannel = await getChannel(
        client,
        EVENTS_COMMITTEE_CHANNEL_ID
      )
      const outreachChannel = await getChannel(
        client,
        OUTREACH_COMMITTEE_CHANNEL_ID
      )
      eventsChannel.send({ embed: embed1 })
      eventsChannel.send({ embed: embed2 })
      outreachChannel.send({ embed: embed1 })
      outreachChannel.send({ embed: embed2 })
    }
    res.send({ embed1, embed2 })
  })
})

/* POST certificate created or updated */
router.post('/messages/certificates/new', async (req, res, next) => {
  const certificate = req.body
  const client = new Client()
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    console.log('Logged as AAAIMX!')
    const embed = generateCertificateEmbed(certificate)
    let channel
    if (process.env.NODE_ENV === 'development') {
      channel = await getChannel(client, BOT_CHANNEL_ID)
    } else {
      channel = await getChannel(client, EVENTS_COMMITTEE_CHANNEL_ID)
    }
    channel.send({ embed })
    res.send(embed)
  })
})

module.exports = router
