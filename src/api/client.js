import { db } from '../firebase'
import { ref, get, set } from 'firebase/database'
import cateringMenu from '../data/cateringMenu'
import menuData from '../data/menuData'

const DEFAULT_SOCIALS = [
  { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100063559209172' },
  { label: 'Instagram', url: 'https://www.instagram.com/vreelandmarket' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@vreeland.market' },
  { label: 'X / Twitter', url: 'https://x.com/VreelandMarket' },
  { label: 'YouTube', url: 'https://www.youtube.com/@vreelandmarket8347' },
]

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD

const DEFAULT_HERO = {
  headline: "Woodhaven's Favorite|Party Store.",
  sub: 'Craft beer, fine spirits, fresh deli, and more — all in one spot on Allen Road for over 35 years.',
  banner: '🍺 Check out our expanded bourbon selection — stop in and ask about our barrel picks!',
  showBanner: 'yes',
  callout: '',
}

export const api = {
  // Auth — client-side password check, token stored in sessionStorage
  login: async (password) => {
    if (password !== ADMIN_PASSWORD) throw new Error('Incorrect password')
    const token = btoa(`vreeland:${Date.now()}`)
    return { token }
  },

  // Hero
  getHero: async () => {
    const snapshot = await get(ref(db, 'hero'))
    return snapshot.exists() ? snapshot.val() : DEFAULT_HERO
  },
  updateHero: async (data) => {
    await set(ref(db, 'hero'), data)
    return data
  },

  // Catering
  getCatering: async () => {
    const snapshot = await get(ref(db, 'catering'))
    return snapshot.exists() ? snapshot.val() : { categories: cateringMenu }
  },
  updateCatering: async (categories) => {
    const data = { categories }
    await set(ref(db, 'catering'), data)
    return data
  },

  // Menu
  getMenu: async () => {
    const snapshot = await get(ref(db, 'menu'))
    return snapshot.exists() ? snapshot.val() : { categories: menuData }
  },
  updateMenu: async (categories) => {
    const data = { categories }
    await set(ref(db, 'menu'), data)
    return data
  },

  // Socials
  getSocials: async () => {
    const snapshot = await get(ref(db, 'socials'))
    return snapshot.exists() ? snapshot.val() : DEFAULT_SOCIALS
  },
  updateSocials: async (socials) => {
    await set(ref(db, 'socials'), socials)
    return socials
  },

  // Gallery
  getGallery: async () => {
    const snapshot = await get(ref(db, 'gallery'))
    return snapshot.exists() ? snapshot.val() : []
  },
  updateGallery: async (photos) => {
    await set(ref(db, 'gallery'), photos)
    return photos
  },
}
