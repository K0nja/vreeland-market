import { useState } from 'react'
import { api } from '../api/client'
import styles from './AdminModal.module.css'

export default function AdminModal({ hero, setHero, catering, setCatering, gallery, setGallery, onClose }) {
  const [tab, setTab] = useState('home')
  const [heroForm, setHeroForm] = useState(hero)
  const [menuForm, setMenuForm] = useState(JSON.parse(JSON.stringify(catering)))
  const [galleryForm, setGalleryForm] = useState(gallery ? [...gallery] : [])
  const [newUrl, setNewUrl] = useState('')
  const [newCaption, setNewCaption] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // ── Hero helpers ──────────────────────────────────────────────────────────
  const setHeroField = (k, v) => setHeroForm(f => ({ ...f, [k]: v }))

  const saveHero = async () => {
    setSaving(true); setError('')
    try {
      const updated = await api.updateHero(heroForm)
      setHero(updated)
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Catering helpers ──────────────────────────────────────────────────────
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
      const updated = await api.updateCatering(menuForm.categories)
      setCatering(updated)
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  // ── Gallery helpers ───────────────────────────────────────────────────────
  const addPhoto = () => {
    if (!newUrl.trim()) return
    const photo = { id: `g_${Date.now()}`, url: newUrl.trim(), caption: newCaption.trim() }
    setGalleryForm(prev => [...prev, photo])
    setNewUrl('')
    setNewCaption('')
  }

  const removePhoto = (id) => {
    setGalleryForm(prev => prev.filter(p => p.id !== id))
  }

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
      const updated = await api.updateGallery(galleryForm)
      setGallery(updated)
      onClose()
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.heading}>🛠 Admin Panel</h3>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${tab === 'home' ? styles.tabActive : ''}`} onClick={() => setTab('home')}>
            Home Page
          </button>
          <button className={`${styles.tab} ${tab === 'catering' ? styles.tabActive : ''}`} onClick={() => setTab('catering')}>
            Catering Menu
          </button>
          <button className={`${styles.tab} ${tab === 'gallery' ? styles.tabActive : ''}`} onClick={() => setTab('gallery')}>
            📸 Gallery
          </button>
        </div>

        {error && <div className={styles.errorBanner}>⚠️ {error}</div>}

        {/* ── Home Tab ── */}
        {tab === 'home' && (
          <div className={styles.body}>
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
              <span>Hero Headline (use | for line break)</span>
              <input value={heroForm.headline} onChange={e => setHeroField('headline', e.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Hero Subheading</span>
              <textarea value={heroForm.sub} onChange={e => setHeroField('sub', e.target.value)} />
            </label>
            <label className={styles.field}>
              <span>Callout Bar (leave blank to hide)</span>
              <input value={heroForm.callout} onChange={e => setHeroField('callout', e.target.value)} placeholder="e.g. Holiday Hours in Effect" />
            </label>
            <div className={styles.actions}>
              <button className={styles.cancel} onClick={onClose}>Cancel</button>
              <button className={styles.save} onClick={saveHero} disabled={saving}>
                {saving ? 'Saving…' : 'Save Home Page'}
              </button>
            </div>
          </div>
        )}

        {/* ── Catering Tab ── */}
        {tab === 'catering' && (
          <div className={styles.body}>
            {menuForm.categories.map((cat, catI) => (
              <div key={catI} className={styles.catBlock}>
                <div className={styles.catHeader}>
                  <input
                    className={styles.catNameInput}
                    value={cat.category}
                    onChange={e => updateCategoryName(catI, e.target.value)}
                  />
                  <button className={styles.deleteCatBtn} onClick={() => deleteCategory(catI)} title="Delete category">
                    🗑
                  </button>
                </div>

                {cat.items.map((item, itemI) => (
                  <div key={itemI} className={styles.itemRow}>
                    <div className={styles.itemFields}>
                      <input
                        className={styles.itemName}
                        value={item.name}
                        onChange={e => updateItem(catI, itemI, 'name', e.target.value)}
                        placeholder="Item name"
                      />
                      <input
                        className={styles.itemPrice}
                        value={item.price}
                        onChange={e => updateItem(catI, itemI, 'price', e.target.value)}
                        placeholder="Price"
                      />
                      <input
                        className={styles.itemDesc}
                        value={item.desc}
                        onChange={e => updateItem(catI, itemI, 'desc', e.target.value)}
                        placeholder="Description (optional)"
                      />
                    </div>
                    <button className={styles.deleteItemBtn} onClick={() => deleteItem(catI, itemI)}>✕</button>
                  </div>
                ))}

                <button className={styles.addItemBtn} onClick={() => addItem(catI)}>
                  + Add Item
                </button>
              </div>
            ))}

            <button className={styles.addCatBtn} onClick={addCategory}>
              + Add Category
            </button>

            <div className={styles.actions}>
              <button className={styles.cancel} onClick={onClose}>Cancel</button>
              <button className={styles.save} onClick={saveCatering} disabled={saving}>
                {saving ? 'Saving…' : 'Save Menu'}
              </button>
            </div>
          </div>
        )}

        {/* ── Gallery Tab ── */}
        {tab === 'gallery' && (
          <div className={styles.body}>
            <p className={styles.galleryHint}>
              Paste a public image URL (from Facebook, Google Photos, etc.) or a local path like <code>/images/photo.jpg</code>.
            </p>

            <div className={styles.galleryAdd}>
              <input
                className={styles.galleryUrlInput}
                placeholder="Image URL or /images/filename.jpg"
                value={newUrl}
                onChange={e => setNewUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addPhoto()}
              />
              <input
                className={styles.galleryCaptionInput}
                placeholder="Caption (optional)"
                value={newCaption}
                onChange={e => setNewCaption(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addPhoto()}
              />
              <button className={styles.galleryAddBtn} onClick={addPhoto}>Add</button>
            </div>

            <div className={styles.galleryList}>
              {galleryForm.length === 0 && (
                <p className={styles.galleryEmpty}>No photos yet. Add one above.</p>
              )}
              {galleryForm.map((photo, i) => (
                <div key={photo.id} className={styles.galleryItem}>
                  <img
                    src={photo.url}
                    alt={photo.caption || ''}
                    className={styles.galleryThumb}
                    onError={e => { e.currentTarget.style.opacity = '0.3' }}
                  />
                  <div className={styles.galleryItemInfo}>
                    <span className={styles.galleryItemUrl}>{photo.url}</span>
                    {photo.caption && <span className={styles.galleryItemCaption}>{photo.caption}</span>}
                  </div>
                  <div className={styles.galleryItemActions}>
                    <button onClick={() => movePhoto(i, -1)} disabled={i === 0} title="Move up">↑</button>
                    <button onClick={() => movePhoto(i, 1)} disabled={i === galleryForm.length - 1} title="Move down">↓</button>
                    <button onClick={() => removePhoto(photo.id)} className={styles.galleryRemoveBtn} title="Remove">✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.actions}>
              <button className={styles.cancel} onClick={onClose}>Cancel</button>
              <button className={styles.save} onClick={saveGallery} disabled={saving}>
                {saving ? 'Saving…' : 'Save Gallery'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
