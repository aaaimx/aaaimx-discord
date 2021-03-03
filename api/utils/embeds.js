const { longDate, shortDateTime } = require('./dates')

const generateEventDetailsEmbed = event => {
  return {
    color: 0xd9ad26,
    title: `${event.title} (${event.place})`,
    url: 'https://www.aaaimx.org/admin/#/events/' + event.id,
    author: {
      name: 'AAAIMX Event Manager',
      icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png',
      url: 'https://www.aaaimx.org/admin/#/'
    },
    fields: [
      {
        name: 'Fechas',
        value: `Del ${shortDateTime(event.date_start)} al ${shortDateTime(event.date_end)}`
      },
      {
        name: 'Disponibilidad',
        value: event.open_to_public
          ? 'Abierto al público'
          : event.corum + ' personas',
        inline: true
      },
      {
        name: 'Créditos (Horas)',
        value: event.hours,
        inline: true
      },
      {
        name: 'Tipo de evento',
        value: event.type || 'No establecido',
        inline: true
      },
      {
        name: 'Division',
        value: event.division ? event.division.name : 'AAAIMX',
        inline: true
      },
      {
        name: 'Actividades requeridas',
        value: `
            - Flyer
            - Certificados
            - Publicar en Discord (**#events**) y 24 hrs después en redes sociales (**Faceboook**, **Instagram**, ...)
            - **24 hrs antes** del evento enviar correos de confirmación
            - Exportar la **lista de asistentes** y enviarsela al tallerista
            `
      }
    ],
    timestamp: new Date(),
    footer: {
      text: 'Recordatorio de Evento',
      icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png'
    }
  }
}

const generateEventDescriptionEmbed = description => {
  return {
    color: 0xd9ad26,
    title: 'Información adicional',
    author: {
      name: 'AAAIMX Event Manager',
      icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png',
      url: 'https://www.aaaimx.org/admin/#/'
    },
    description: description,
    timestamp: new Date(),
    footer: {
      text: 'Recordatorio de Evento',
      icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png'
    }
  }
}

const generateCertificateEmbed = certificate => {
  return {
    color: 0xd9ad26,
    title: `CERTIFICATE OF ${certificate.type} | ${certificate.to}`,
    url: 'https://www.aaaimx.org/certificates/?id=' + certificate.uuid,
    author: {
      name: 'AAAIMX Event Manager',
      icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png',
      url: 'https://www.aaaimx.org/admin/#/'
    },
    description: certificate.description,
    fields: [
      {
        name: 'Fecha',
        value: new Date(certificate.created_at).toLocaleDateString(),
        inline: true
      },
      {
        name: 'Estado',
        value: certificate.published ? 'Online' : 'Draft',
        inline: true
      },
      {
        name: 'Evento',
        value: certificate.event ? certificate.event.title : 'No indicado',
        inline: true
      }
    ],
    image: {
      url: certificate.file
    },
    timestamp: new Date(),
    footer: {
      text: 'ID: ' + certificate.uuid,
      icon_url: 'https://www.aaaimx.org/img/sprites/aaaimx-transparent.png'
    }
  }
}

module.exports = {
  generateEventDetailsEmbed,
  generateEventDescriptionEmbed,
  generateCertificateEmbed
}
