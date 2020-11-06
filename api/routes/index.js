const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { Client } = require('discord.js')

// Create an instance of a Discord client
const client = new Client()

const { getAllMembers, getAllRoles } = require('../../src/utils')

function sortMembers (members, sortBy, sortDesc) {
  if (sortBy.length === 1 && sortDesc.length === 1) {
    members = members.sort((a, b) => {
      const sortA = a[sortBy]
      const sortB = b[sortBy]
      if (sortDesc == 'true') {
        if (sortA < sortB) return 1
        if (sortA > sortB) return -1
        return 0
      } else {
        if (sortA < sortB) return -1
        if (sortA > sortB) return 1
        return 0
      }
    })
  }
  return members
}

function filterMembers (members, q, role) {
  members = members.filter(
    m =>
      m.name.toUpperCase().indexOf(q.toUpperCase()) !== -1 ||
      m.username.toUpperCase().indexOf(q.toUpperCase()) !== -1
  )

  if (role) members = members.filter(m => m.roles.includes(role))
  return members
}

function paginateMembers (query, members) {
  // get query params
  const role = query.role
  const limit = parseInt(query.limit) || 10
  const offset = parseInt(query.offset) || 0
  const sortBy = query.sortBy || []
  const sortDesc = query.sortDesc || []
  const q = query.q || ''

  // sorting by field
  members = sortMembers(members, sortBy, sortDesc)

  // search
  members = filterMembers(members, q, role)

  // paginated response
  return {
    total: members.length,
    page: `${offset}-${offset + limit}`,
    nextPage: offset + limit >= members.length,
    next: `?offset=${offset + limit}&limit=${limit}&role=${role || ''}`,
    previous:
      offset <= 0
        ? null
        : `?offset=${offset - limit}&limit=${limit}&role=${role || ''}`,
    members: members.slice(offset, offset + limit)
  }
}

/* GET home page. */
router.get('/', (req, res, next) => {
  client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`)
    let members = await getAllMembers(client)
    const paginatedResponse = paginateMembers(req.query, members)
    const roles = await getAllRoles(client)
    res.render('index', { ...paginatedResponse, roles })
  })
})

/* GET home page. */
router.get('/members', async (req, res, next) => {
  const members = await getAllMembers(client)
  const paginatedResponse = paginateMembers(req.query, members)
  res.send(paginatedResponse)
})

/* GET home page. */
router.get('/roles', async (req, res, next) => {
  const roles = await getAllRoles(client)
  res.send(roles)
})

module.exports = router
