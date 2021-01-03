const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { Client } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()

const { getAllMembers, getAllRoles } = require('../../src/utils')

/* GET home page. */
router.get('/', (req, res, next) => {
  client.login(process.env.TOKEN)
  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)
    const members = await getAllMembers(client)
    const roles = await getAllRoles(client)
    res.render('index', {
      total: members.length,
      members,
      roles
    })
  })
})

module.exports = router
