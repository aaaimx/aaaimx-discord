const longDate = date => {
  const event = new Date(date)
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour12: false
  }
  return event.toLocaleString('es-MX', options)
}

const shortDateTime = date => {
  const event = new Date(date)
  console.log(event.getTimezoneOffset())
  return event.toLocaleString('es-MX', {
    hour12: true,
    timeZone: 'America/Merida',
    dateStyle: 'long',
    timeStyle: 'long'
  })
}

module.exports = {
  longDate,
  shortDateTime
}
