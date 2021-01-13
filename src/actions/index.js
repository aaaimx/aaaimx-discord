const { onGuildMemberAdd } = require('./greeting')
const { getMembership } = require('./membership')
const { onKick } = require('./kick')

module.exports = {
  onGuildMemberAdd,
  getMembership,
  onKick
}
