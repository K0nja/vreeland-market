import { useState } from 'react'
import styles from './AdminModal.module.css'

export default function AdminModal({ hero, setHero, onClose }) {
  const [form, setForm] = useState(hero)
  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleSave = async () => {
    setHero(form)
    try {
      // Persist via localStorage for simplicity when hosted
      localStorage.setItem('vreeland_hero', JSON.stringify(form))
    } catch (e) {
      console.warn('Could not save hero data:', e)
    }
    onClose()
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.heading}>🛠 Edit Home Page</h3>
        <p className={styles.sub}>Changes save immediately and persist for all visitors.</p>

        <label className={styles.field}>
          <span>Seasonal Banner Text</span>
          <input
            value={form.banner}
            onChange={(e) => set('banner', e.target.value)}
            placeholder="e.g. 🍺 Summer Specials Now Available!"
          />
        </label>

        <label className={styles.field}>
          <span>Show Banner?</span>
          <select
            value={form.showBanner}
            onChange={(e) => set('showBanner', e.target.value)}
          >
            <option value="yes">Yes — Show Banner</option>
            <option value="no">No — Hide Banner</option>
          </select>
        </label>

        <label className={styles.field}>
          <span>Hero Headline (use | for line break)</span>
          <input
            value={form.headline}
            onChange={(e) => set('headline', e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>Hero Subheading</span>
          <textarea
            value={form.sub}
            onChange={(e) => set('sub', e.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span>Callout Bar (e.g. "Holiday Hours in Effect" — leave blank to hide)</span>
          <input
            value={form.callout}
            onChange={(e) => set('callout', e.target.value)}
            placeholder="Leave blank to hide"
          />
        </label>

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>Cancel</button>
          <button className={styles.save} onClick={handleSave}>Save Changes</button>
        </div>
      </div>
    </div>
  )
}
