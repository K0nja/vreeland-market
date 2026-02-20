import { useState } from 'react'
import { Section, SectionLabel, SectionTitle } from '../components/Section'
import cateringMenu from '../data/cateringMenu'
import styles from './CateringPage.module.css'

export default function CateringPage() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className={`${styles.hero} page-hero`} style={{ background: 'var(--green)' }}>
        <div className={styles.heroInner}>
          <div className="page-hero__eyebrow page-hero__eyebrow--white">Catering Menu</div>
          <h1 style={{ color: '#fff' }}>Feed Your Whole Crew</h1>
          <p style={{ color: 'rgba(255,255,255,0.72)' }}>
            Order ahead for parties, events, and gatherings. Call us or stop in to place a catering
            order with at least 24 hours notice.
          </p>
        </div>
      </div>

      <Section>
        <SectionLabel>Menu</SectionLabel>
        <SectionTitle>Order in Advance</SectionTitle>
        <p className={styles.intro}>
          Browse by category below. Call{' '}
          <a href="tel:+17346757006" className={styles.phone}>
            (734) 675-7006
          </a>{' '}
          or stop in to place your catering order. We ask for at least 24 hours notice for all
          catering items.
        </p>

        {/* Tabs */}
        <div className={styles.tabs}>
          {cateringMenu.map((cat, i) => (
            <button
              key={cat.category}
              className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <div className={styles.menuGrid}>
          {cateringMenu[activeTab].items.map((item) => (
            <div key={item.name} className={`${styles.menuItem} fade-in`}>
              <div className={styles.menuInfo}>
                <div className={styles.menuName}>{item.name}</div>
                <div className={styles.menuDesc}>{item.desc}</div>
              </div>
              <div className={styles.menuPrice}>{item.price}</div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.cta}>
          <h3 className={styles.ctaHeading}>Ready to Order?</h3>
          <p className={styles.ctaSub}>
            Give us a call and we'll take it from there. All catering orders require at least 24
            hours notice. Custom orders welcome.
          </p>
          <a href="tel:+17346757006">
            <button className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }}>
              📞 Call (734) 675-7006
            </button>
          </a>
        </div>
      </Section>
    </>
  )
}
