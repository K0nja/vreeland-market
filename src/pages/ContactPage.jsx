import { Section, SectionLabel, SectionTitle } from '../components/Section'
import styles from './ContactPage.module.css'

const HOURS = [
  { day: 'Sunday',    hours: '9:00 AM – 10:00 PM', dayIndex: 0 },
  { day: 'Monday',    hours: '9:00 AM – 10:00 PM', dayIndex: 1 },
  { day: 'Tuesday',   hours: '9:00 AM – 10:00 PM', dayIndex: 2 },
  { day: 'Wednesday', hours: '9:00 AM – 10:00 PM', dayIndex: 3 },
  { day: 'Thursday',  hours: '9:00 AM – 11:00 PM', dayIndex: 4 },
  { day: 'Friday',    hours: '9:00 AM – 11:00 PM', dayIndex: 5 },
  { day: 'Saturday',  hours: '9:00 AM – 11:00 PM', dayIndex: 6 },
]

export default function ContactPage() {
  const today = new Date().getDay()

  return (
    <>
      <div className={`${styles.hero} page-hero`} style={{ background: 'var(--ink)' }}>
        <div className={styles.heroInner}>
          <div className="page-hero__eyebrow page-hero__eyebrow--amber">Contact &amp; Hours</div>
          <h1 style={{ color: '#fff' }}>Come See Us</h1>
          <p style={{ color: '#999' }}>
            We're on Allen Road in Woodhaven — easy to find and open 7 days a week.
          </p>
        </div>
      </div>

      <Section>
        <SectionLabel>Info &amp; Hours</SectionLabel>
        <SectionTitle>Find Us.</SectionTitle>

        <div className={styles.grid}>
          {/* Contact info */}
          <div className={styles.card}>
            <h3 className={styles.cardHeading}>Get In Touch</h3>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📍</span>
              <div>
                <div className={styles.infoLabel}>Address</div>
                <div className={styles.infoVal}>
                  26796 Allen Rd
                  <br />
                  Woodhaven, MI 48183
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📞</span>
              <div>
                <div className={styles.infoLabel}>Phone</div>
                <div className={styles.infoVal}>
                  <a href="tel:+17346757006" className={styles.link}>
                    (734) 675-7006
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>🎥</span>
              <div>
                <div className={styles.infoLabel}>YouTube</div>
                <div className={styles.infoVal}>
                  <a
                    href="https://www.youtube.com/@vreelandmarket8347"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    @vreelandmarket8347
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>📮</span>
              <div>
                <div className={styles.infoLabel}>Post Office</div>
                <div className={styles.infoVal}>In-store extended-hours US Post Office.</div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className={styles.card}>
            <h3 className={styles.cardHeading}>Store Hours</h3>
            <div className={styles.hoursTable}>
              {HOURS.map((h) => (
                <div
                  key={h.day}
                  className={`${styles.hoursRow} ${h.dayIndex === today ? styles.hoursToday : ''}`}
                >
                  <span>
                    {h.day}
                    {h.dayIndex === today && (
                      <span className={styles.todayBadge}>Today</span>
                    )}
                  </span>
                  <span>{h.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Map link */}
        <div className={styles.mapBox}>
          <span className={styles.mapIcon}>🗺️</span>
          <p className={styles.mapAddr}>26796 Allen Rd, Woodhaven, MI 48183</p>
          <a
            href="https://maps.google.com/?q=26796+Allen+Rd,+Woodhaven,+MI+48183"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapLink}
          >
            Open in Google Maps →
          </a>
        </div>
      </Section>
    </>
  )
}
