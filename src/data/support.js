// Coordonnées du support client — dis-moi ton vrai numéro WhatsApp/téléphone et je le mets ici
export const SUPPORT = {
  whatsapp: '21600000000', // TODO: remplacer par le vrai numéro (sans + ni espaces)
  phone: '+216 00 000 000', // TODO: remplacer par le vrai numéro
  email: 'apatchegaming@gmail.com',
}

export const waLink = (msg) => `https://wa.me/${SUPPORT.whatsapp}?text=${encodeURIComponent(msg)}`
