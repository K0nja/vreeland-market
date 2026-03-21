import { useState } from 'react'
import styles from './Gallery.module.css'

export default function Gallery({ photos }) {
  const [lightbox, setLightbox] = useState(null)

  if (!photos || photos.length === 0) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {photos.map((photo) => (
          <button
            key={photo.id}
            className={styles.tile}
            onClick={() => setLightbox(photo)}
            aria-label={photo.caption || 'View photo'}
          >
            <img
              src={photo.url}
              alt={photo.caption || ''}
              className={styles.img}
              loading="lazy"
              onError={e => { e.currentTarget.style.opacity = '0.3' }}
            />
            {photo.caption && (
              <div className={styles.caption}>{photo.caption}</div>
            )}
          </button>
        ))}
      </div>

      {lightbox && (
        <div className={styles.overlay} onClick={() => setLightbox(null)}>
          <div className={styles.lightbox} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setLightbox(null)}>✕</button>
            <img
              src={lightbox.url}
              alt={lightbox.caption || ''}
              className={styles.lightboxImg}
            />
            {lightbox.caption && (
              <p className={styles.lightboxCaption}>{lightbox.caption}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
