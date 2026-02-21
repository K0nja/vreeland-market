const BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000'

function authHeaders() {
  const token = sessionStorage.getItem('vreeland_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function request(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const api = {
  // Auth
  login: (password) => request('POST', '/api/auth/login', { password }),

  // Hero
  getHero:    ()     => request('GET',  '/api/hero'),
  updateHero: (data) => request('PUT',  '/api/hero', data),

  // Catering
  getCatering:    ()           => request('GET', '/api/catering'),
  updateCatering: (categories) => request('PUT', '/api/catering', { categories }),
}
