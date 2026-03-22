import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'
import styles from './AdminPage.module.css'
import homeStyles from './HomePage.module.css'

const DEFAULT_HERO = {
  headline: "Woodhaven's Favorite|Party Store.",
  sub: 'Craft beer, fine spirits, fresh deli, and more — all in one spot on Allen Road for over 35 years.',
  banner: '🍺 Check out our expanded bourbon selection — stop in and ask about our barrel picks!',
  showBanner: 'yes',
  callout: '',
}

export default function AdminPage() {
  const navigate = useNavigate()
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem('vreeland_token'))
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)

  const [tab, setTab] = useState('home')
  const [heroForm, setHeroForm] = useState(DEFAULT_HERO)
  const [menuForm, setMenuForm] = useState({ categories: [] })
  const [galleryForm, setGalleryForm] = useState([])
  const [newUrl, setNewUrl] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState('')

  useEffect(() => {
    if (authed) {
      api.getHero().then(d => { setHeroForm(d) }).catch(() => {})
      api.getCatering().then(d => { setMenuForm(JSON.parse(JSON.stringify(d))) }).catch(() => {})
      api.getGallery().then(d => { setGalleryForm([...d]) }).catch(() => {})
    }
  }, [authed])

  const handleLogin = async () => {
    try {
      const { token } = await api.login(pw)
      sessionStorage.setItem('vreeland_token', token)
      setAuthed(true)
      setPwErr(false)
      setPw('')
    } catch {
      setPwErr(true)
    }
  }

  const showSaved = (msg) => { setSaved(msg); setTimeout(() => setSaved(''), 3000) }

  // ── Hero ──────────────────────────────────────────────────────────────────
  const setHeroField = (k, v) => setHeroForm(f => ({ ...f, [k]: v }))

  const saveHero = async () => {
    setSaving(true); setError('')
    try {
      await api.updateHero(heroForm)
      showSaved('Home page saved!')
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  // ── Catering ──────────────────────────────────────────────────────────────
  const updateItem = (catI, itemI, field, value) => {
    setMenuForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.categories[catI].items[itemI][field] = value
      return next
    })
  }
  const deleteItem = (catI, itemI) => {
    setMenuForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.categories[catI].items.splice(itemI, 1)
      return next
    })
  }
  const addItem = (catI) => {
    setMenuForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.categories[catI].items.push({ name: '', desc: '', price: '' })
      return next
    })
  }
  const addCategory = () => {
    setMenuForm(prev => ({
      ...prev,
      categories: [...prev.categories, { category: 'New Category', items: [] }]
    }))
  }
  const deleteCategory = (catI) => {
    setMenuForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.categories.splice(catI, 1)
      return next
    })
  }
  const updateCategoryName = (catI, value) => {
    setMenuForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.categories[catI].category = value
      return next
    })
  }
  const saveCatering = async () => {
    setSaving(true); setError('')
    try {
      await api.updateCatering(menuForm.categories)
      showSaved('Catering menu saved!')
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  // ── Gallery ───────────────────────────────────────────────────────────────
  const addPhoto = () => {
    if (!newUrl.trim()) return
    const photo = { id: `g_${Date.now()}`, url: newUrl.trim(), caption: newCaption.trim() }
    setGalleryForm(prev => [...prev, photo])
    setNewUrl(''); setNewCaption('')
  }
  const removePhoto = (id) => setGalleryForm(prev => prev.filter(p => p.id !== id))
  const movePhoto = (index, dir) => {
    setGalleryForm(prev => {
      const next = [...prev]
      const target = index + dir
      if (target < 0 || target >= next.length) return prev
      ;[next[index], next[target]] = [next[target], next[index]]
      return next
    })
  }
  const saveGallery = async () => {
    setSaving(true); setError('')
    try {
      await api.updateGallery(galleryForm)
      showSaved('Gallery saved!')
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className={homeStyles.pwBackdrop} style={{ position: 'fixed', inset: 0 }}>
        <div className={homeStyles.pwBox}>
          <h4 className={homeStyles.pwHeading}>Admin Access</h4>
          <p className={homeStyles.pwSub}>Enter the admin password to edit the site.</p>
          <input
            type="password" className={homeStyles.pwInput} placeholder="Password"
            value={pw} onChange={e => setPw(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()} autoFocus
          />
          {pwErr && <p className={homeStyles.pwErr}>Incorrect password. Try again.</p>}
          <div className={homeStyles.pwActions}>
            <button className={homeStyles.pwCancel} onClick={() => navigate('/')}>Cancel</button>
            <button className="btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    )
  }

  // ── Admin page ────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderInner}>
          <div>
            <h1 className={styles.pageTitle}>Admin</h1>
            <p className={styles.pageSub}>Edit site content</p>
          </div>
          <button className={styles.logoutBtn} onClick={() => { sessionStorage.removeItem('vreeland_token'); navigate('/') }}>
            Log out
          </button>
        </div>
      </div>

      <div className={styles.layout}>
        <nav className={styles.sidebar}>
          {[['home', 'Home Page'], ['catering', 'Catering Menu'], ['gallery', 'Gallery']].map(([key, label]) => (
            <button
              key={key}
              className={`${styles.navItem} ${tab === key ? styles.navItemActive : ''}`}
              onClick={() => setTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className={styles.content}>
          {error && <div className={styles.errorBanner}>⚠️ {error}</div>}
          {saved && <div className={styles.successBanner}>✓ {saved}</div>}

          {/* ── Home Tab ── */}
          {tab === 'home' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Home Page</h2>

              <label className={styles.field}>
                <span>Hero Headline <small>(use | for line break)</small></span>
                <input value={heroForm.headline} onChange={e => setHeroField('headline', e.target.value)} />
              </label>
              <label className={styles.field}>
                <span>Hero Subheading</span>
                <textarea value={heroForm.sub} onChange={e => setHeroField('sub', e.target.value)} />
              </label>
              <label className={styles.field}>
                <span>Seasonal Banner Text</span>
                <input value={heroForm.banner} onChange={e => setHeroField('banner', e.target.value)} placeholder="e.g. 🍺 Summer Specials Now Available!" />
              </label>
              <label className={styles.field}>
                <span>Show Banner?</span>
                <select value={heroForm.showBanner} onChange={e => setHeroField('showBanner', e.target.value)}>
                  <option value="yes">Yes — Show Banner</option>
                  <option value="no">No — Hide Banner</option>
                </select>
              </label>
              <label className={styles.field}>
                <span>Callout Bar <small>(leave blank to hide)</small></span>
                <input value={heroForm.callout} onChange={e => setHeroField('callout', e.target.value)} placeholder="e.g. Holiday Hours in Effect" />
              </label>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={saveHero} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Home Page'}
                </button>
              </div>
            </div>
          )}

          {/* ── Catering Tab ── */}
          {tab === 'catering' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Catering Menu</h2>

              {menuForm.categories.map((cat, catI) => (
                <div key={catI} className={styles.catBlock}>
                  <div className={styles.catHeader}>
                    <input
                      className={styles.catNameInput}
                      value={cat.category}
                      onChange={e => updateCategoryName(catI, e.target.value)}
                    />
                    <button className={styles.deleteCatBtn} onClick={() => deleteCategory(catI)} title="Delete category">Delete</button>
                  </div>

                  {cat.items.map((item, itemI) => (
                    <div key={itemI} className={styles.itemRow}>
                      <div className={styles.itemFields}>
                        <input value={item.name} onChange={e => updateItem(catI, itemI, 'name', e.target.value)} placeholder="Item name" />
                        <input value={item.price} onChange={e => updateItem(catI, itemI, 'price', e.target.value)} placeholder="Price" className={styles.itemPrice} />
                        <input value={item.desc} onChange={e => updateItem(catI, itemI, 'desc', e.target.value)} placeholder="Description (optional)" className={styles.itemDesc} />
                      </div>
                      <button className={styles.deleteItemBtn} onClick={() => deleteItem(catI, itemI)}>✕</button>
                    </div>
                  ))}

                  <button className={styles.addItemBtn} onClick={() => addItem(catI)}>+ Add Item</button>
                </div>
              ))}

              <button className={styles.addCatBtn} onClick={addCategory}>+ Add Category</button>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={saveCatering} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Menu'}
                </button>
              </div>
            </div>
          )}

          {/* ── Gallery Tab ── */}
          {tab === 'gallery' && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>Gallery</h2>
              <p className={styles.hint}>Paste a public image URL to add it to the homepage gallery.</p>

              <div className={styles.galleryAdd}>
                <input
                  placeholder="Image URL"
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addPhoto()}
                />
                <input
                  placeholder="Caption (optional)"
                  value={newCaption}
                  onChange={e => setNewCaption(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addPhoto()}
                  className={styles.captionInput}
                />
                <button className={styles.addPhotoBtn} onClick={addPhoto}>Add Photo</button>
              </div>

              <div className={styles.galleryGrid}>
                {galleryForm.length === 0 && <p className={styles.empty}>No photos yet.</p>}
                {galleryForm.map((photo, i) => (
                  <div key={photo.id} className={styles.galleryCard}>
                    <img src={photo.url} alt={photo.caption || ''} className={styles.galleryThumb} onError={e => { e.currentTarget.style.opacity = '0.3' }} />
                    {photo.caption && <p className={styles.galleryCaption}>{photo.caption}</p>}
                    <div className={styles.galleryCardActions}>
                      <button onClick={() => movePhoto(i, -1)} disabled={i === 0}>↑</button>
                      <button onClick={() => movePhoto(i, 1)} disabled={i === galleryForm.length - 1}>↓</button>
                      <button onClick={() => removePhoto(photo.id)} className={styles.removeBtn}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.actions}>
                <button className={styles.saveBtn} onClick={saveGallery} disabled={saving}>
                  {saving ? 'Saving…' : 'Save Gallery'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
