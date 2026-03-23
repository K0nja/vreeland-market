import { Section, SectionLabel, SectionTitle } from '../components/Section'
import styles from './OrderPage.module.css'

const PLATFORMS = [
  {
    name: 'Toast',
    icon: '🍕',
    desc: 'Order directly through our own Toast page for pickup.',
    url: 'https://www.toasttab.com/local/order/vreeland-market-26796-allen-rd/r-f58b9129-46b1-4ad9-90a6-22e99344f39a',
  },
  {
    name: 'Grubhub',
    icon: '🛵',
    desc: 'Order through Grubhub for delivery or pickup.',
    url: 'https://www.grubhub.com/restaurant/vreeland-market-26796-allen-rd-woodhaven/1983860',
  },
  {
    name: 'DoorDash',
    icon: '🚪',
    desc: 'Order through DoorDash for delivery or pickup.',
    url: 'https://www.doordash.com/en-CA/store/vreeland-market-woodhaven-1080228/',
  },
  {
    name: 'Uber Eats',
    icon: '🛍️',
    desc: 'Order through Uber Eats for delivery or pickup.',
    url: 'https://www.ubereats.com/store/vreeland-market/pGhl966cTcCF2c5-yiHNyw',
  },
]

const INFO_CARDS = [
  {
    icon: '📞',
    title: 'Prefer to Call?',
    text: "Give us a ring at (734) 675-7006 and we'll take your order over the phone. Ready in minutes.",
  },
  {
    icon: '🚗',
    title: 'Pick Up In-Store',
    text: 'All orders are available for in-store pickup at 26796 Allen Rd. We\'ll have it ready and waiting.',
  },
  {
    icon: '🕐',
    title: 'Order Ahead',
    text: 'Need food for a party or event? Use our Catering menu to order ahead and guarantee availability.',
  },
]

export default function OrderPage() {
  return (
    <>
      <div className={`${styles.hero} page-hero`} style={{ background: 'var(--ink)' }}>
        <div className={styles.heroInner}>
          <div className="page-hero__eyebrow page-hero__eyebrow--amber">Order Online</div>
          <h1 style={{ color: '#fff' }}>Order Fresh, Fast &amp; Easy</h1>
          <p style={{ color: '#999' }}>
            Skip the wait — order deli food, pizza, and more right from our Toast ordering page.
          </p>
        </div>
      </div>

      <Section>
        <SectionLabel>Online Ordering</SectionLabel>
        <SectionTitle>Ready when you are.</SectionTitle>

        <div className={styles.platformGrid}>
          {PLATFORMS.map((p) => (
            <div key={p.name} className={`${styles.platformCard} ${!p.url ? styles.platformDisabled : ''} fade-up`}>
              <div className={styles.platformIcon}>{p.icon}</div>
              <h3 className={styles.platformName}>{p.name}</h3>
              <p className={styles.platformDesc}>{p.desc}</p>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className={`btn-primary ${styles.platformBtn}`}>
                  Order on {p.name} →
                </a>
              ) : (
                <span className={styles.comingSoon}>Coming Soon</span>
              )}
            </div>
          ))}
        </div>

        <div className={styles.infoGrid}>
          {INFO_CARDS.map((card) => (
            <div key={card.title} className={styles.infoCard}>
              <div className={styles.infoIcon}>{card.icon}</div>
              <h4 className={styles.infoTitle}>{card.title}</h4>
              <p className={styles.infoText}>{card.text}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
