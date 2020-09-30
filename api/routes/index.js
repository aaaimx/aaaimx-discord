const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { client } = require('../../src')
const { getAllMembers } = require('../../src/utils')


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

/* GET home page. */
router.get('/members', async (req, res, next) => {
  const members = await getAllMembers(client)
  console.log(members)
  res.send(members)
})

module.exports = router
