import { Section, SectionLabel, SectionTitle } from '../components/Section'
import timeline from '../data/timeline'
import styles from './HistoryPage.module.css'

const STATS = [
  ['35+', 'Years in Business'],
  ['500+', 'Wines in Stock'],
  ['#1',  'Craft Beer Selection Downriver'],
  ['1',   'Family, Always'],
]

export default function HistoryPage() {
  return (
    <>
      <div className={`${styles.hero} page-hero`} style={{ background: 'var(--ink)' }}>
        <div className={styles.heroInner}>
          <div className="page-hero__eyebrow page-hero__eyebrow--amber">Our Story</div>
          <h1 style={{ color: '#fff' }}>35+ Years Serving Woodhaven</h1>
          <p style={{ color: '#999' }}>
            From a small corner store to a Downriver institution — the Vreeland story is one of
            family, community, and a genuine love of great food and drink.
          </p>
        </div>
      </div>

      <Section>
        <SectionLabel>Timeline</SectionLabel>
        <SectionTitle>How we got here.</SectionTitle>

        <div className={styles.timeline}>
          {timeline.map((item, i) => (
            <div key={item.year} className={`${styles.tlItem} fade-up delay-${(i % 4) + 1}`}>
              <div className={styles.tlYear}>{item.year}</div>
              <div className={styles.tlBody}>
                <h3 className={styles.tlTitle}>{item.title}</h3>
                <p className={styles.tlDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.aboutStrip}>
          <div className={styles.aboutText}>
            <h3 className={styles.aboutHeading}>
              A Family Business,
              <br />
              Through and Through.
            </h3>
            <p>
              Vreeland Market has always been a family affair. From the owners and staff to the
              loyal customers who've been coming in for decades — we're a community institution.
            </p>
            <p>
              We take pride in knowing our customers by name, stocking what people actually want,
              and going above and beyond to make every visit worth the trip.
            </p>
          </div>
          <div className={styles.statGrid}>
            {STATS.map(([num, label]) => (
              <div key={label} className={styles.stat}>
                <div className={styles.statNum}>{num}</div>
                <div className={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}
