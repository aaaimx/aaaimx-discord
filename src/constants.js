module.exports = {
  GUILD_ID: '717803240959246497',
  WELCOME_CHANNEL_ID: '717803241554968670',
  WELCOME_MESSAGE:
    'Por favor escribe tu nombre completo y/o cambia tu **apodo** por tu primer nombre y un apellido',
  EVENTS_COMMITTEE_CHANNEL_ID: '717994968580489296',
  OUTREACH_COMMITTEE_CHANNEL_ID: '717994898334285884',
  BOT_ID: '746607629031440405',
  BOT_CHANNEL_ID: '748718054136872960',
  BOT_CHANNEL_NAME: 'bot',
  DEFAULT_TIMEOUT: 20000,
  BASE_URL:
    process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:8000'
      : 'https://aaaimx-admin.herokuapp.com'
}
