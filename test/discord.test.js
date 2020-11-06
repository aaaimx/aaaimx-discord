/**
 * @author Raul Novelo <raul.novelo@aaaimx.org>
 */
require('dotenv').config()

// Extract the required classes from the discord.js module
const { Client } = require('discord.js')
const {
  WELLCOME_CHANNEL_ID,
  DEFAULT_TIMEOUT,
  BOT_CHANNEL_ID
} = require('../src/constants')
const { getChannel } = require('../src/helpers')
const { getAllMembers } = require('../src/utils')

// Create an instance of a Discord client
const client = new Client()
jest.setTimeout(DEFAULT_TIMEOUT)

describe('Tests for Discord.js API', () => {
  describe('Channels tests', () => {
    test('Fetch channels', done => {
      client.on('ready', async () => {
        // Fetch a channel by its id
        const channel1 = await getChannel(client, WELLCOME_CHANNEL_ID)
        const channel2 = await getChannel(client, BOT_CHANNEL_ID)
        expect(channel1.name).toBe('welcome')
        expect(channel2.name).toBe('bot')
        done()
      })
    })
  })
  describe('Members tests', () => {
    // TODO: test member functions
  })
})

client.login(process.env.TOKEN)
