/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
const axios = require('axios')
const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:8000'
    : 'https://aaaimx-admin.herokuapp.com'

const _axios = axios.create({
  baseURL,
  timeout: 30000
})

function getMembership (params) {
  return _axios({
    url: '/membership/',
    method: 'GET',
    params
  })
}

module.exports = {
  baseURL,
  getMembership
}
