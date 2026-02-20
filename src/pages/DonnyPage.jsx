import { Section, SectionLabel, SectionTitle } from '../components/Section'
import styles from './DonnyPage.module.css'

const YT_CHANNEL = 'https://www.youtube.com/@vreelandmarket8347'

export default function DonnyPage() {
  return (
    <>
      <div className={`${styles.hero} page-hero`} style={{ background: 'var(--ink)' }}>
        <div className={styles.bigPlay} aria-hidden="true">▶</div>
        <div className={styles.heroInner}>
          <div className="page-hero__eyebrow page-hero__eyebrow--red">Donny's Corner</div>
          <h1 style={{ color: '#fff' }}>Brought to You by Cousin Donny</h1>
          <p style={{ color: '#999' }}>
            Donny shares the best of Vreeland Market on YouTube — new products, picks, and the
            personality that makes this store one of a kind.
          </p>
        </div>
      </div>

      <Section>
        <SectionLabel>Featured Channel</SectionLabel>
        <SectionTitle>Watch Donny's Corner</SectionTitle>
        <p className={styles.intro}>
          Cousin Donny posts regular videos covering new arrivals, bourbon picks, store news, and
          more. Hit subscribe to stay in the loop.
        </p>

        {/* Main channel card */}
        <div className={styles.channelCard}>
          <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer" className={styles.ytThumb}>
            <div className={styles.playBtn}>▶</div>
            <span>Click to visit Donny's Corner on YouTube</span>
          </a>
          <div className={styles.channelBody}>
            <h3 className={styles.channelTitle}>Donny's Corner — Vreeland Market</h3>
            <p className={styles.channelDesc}>
              Videos from inside the store covering craft beer, bourbon picks, new arrivals, and
              everything happening at Vreeland Market in Woodhaven, MI.
            </p>
            <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer">
              <button className={styles.ytBtn}>
                <span>▶</span> Watch on YouTube
              </button>
            </a>
          </div>
        </div>

        {/* Subscribe CTA */}
        <div className={styles.subscribeCta}>
          <h3 className={styles.ctaHeading}>Don't Miss a Video</h3>
          <p className={styles.ctaSub}>
            Subscribe to Donny's Corner on YouTube and you'll be the first to know about new
            arrivals, special picks, and store updates.
          </p>
          <a href={YT_CHANNEL} target="_blank" rel="noopener noreferrer">
            <button className={styles.subBtn}>
              <span>▶</span> Subscribe on YouTube
            </button>
          </a>
        </div>
      </Section>
    </>
  )
}
