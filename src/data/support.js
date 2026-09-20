// Coordonnées du support client ZTC Shop
export const SUPPORT = {
  whatsapp: '21620074821', // +216 20 074 821 (sans + ni espaces pour wa.me)
  phone: '+216 20 074 821',
  email: 'apatchegaming@gmail.com',
  discord: 'https://discord.com/channels/797222565915525121/1507164130044416000',
}

export const waLink = (msg) => `https://wa.me/${SUPPORT.whatsapp}?text=${encodeURIComponent(msg)}`
