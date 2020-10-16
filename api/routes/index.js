const express = require('express')
const router = express.Router()
// Extract the required classes from the discord.js module
const { client } = require('../discord')
const { getAllMembers, getAllRoles } = require('../../src/utils')

function sortMembers (members, sortBy, sortDesc) {
  if (sortBy.length === 1 && sortDesc.length === 1) {
    members = members.sort((a, b) => {
      const sortA = a[sortBy[0]]
      const sortB = b[sortBy[0]]
      if (sortDesc[0] == 'true') {
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
  const q = query.q || ''
  const sortBy = query.sortBy || []
  const sortDesc = query.sortDesc || []

  // sorting by field
  members = sortMembers(members, sortBy, sortDesc)

  // search
  members = filterMembers(members, q, role)

  // paginated response
  return {
    total: members.length,
    next: `?offset=${offset + limit}&limit=${limit}`,
    previous: offset <= 0 ? null : `?offset=${offset - limit}&limit=${limit}`,
    members: members.slice(offset, offset + limit)
  }
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  let members = await getAllMembers(client)
  const paginatedResponse = paginateMembers(req.query, members)
  const roles = await getAllRoles(client)
  res.render('index', { ...paginatedResponse, roles })
})

/* GET home page. */
router.get('/members', async (req, res, next) => {
  const members = await getAllMembers(client)
  const paginatedResponse = paginateMembers(req.query, members)
  res.send(paginatedResponse)
})

module.exports = router
