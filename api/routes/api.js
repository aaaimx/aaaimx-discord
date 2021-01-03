const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { Client } = require('discord.js')

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
router.get('/message', async (req, res, next) => {
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    const channel = await getChannel(client, BOT_CHANNEL_ID)
    channel.send('Hi!')
    res.send(channel)
  })
})

module.exports = router
