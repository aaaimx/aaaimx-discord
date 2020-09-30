const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { client } = require('../discord')
const { getAllMembers, getAllRoles } = require('../../src/utils')

/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log(req.query)
  const members = await getAllMembers(client)
  const roles = await getAllRoles(client)
  res.render('index', { members, roles })
})

/* GET home page. */
router.get('/members', async (req, res, next) => {
  const members = await getAllMembers(client)
  res.send(members)
})

module.exports = router
