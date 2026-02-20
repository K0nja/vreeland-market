import { Section, SectionLabel, SectionTitle } from '../components/Section'
import styles from './OrderPage.module.css'

// ← Replace with your actual Toast ordering URL
const TOAST_URL = 'YOUR_TOAST_URL_HERE'

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

        <div className={`${styles.toastCard} fade-up`}>
          <div className={styles.toastIcon}>🍕</div>
          <h3 className={styles.toastHeading}>Order on Toast</h3>
          <p className={styles.toastBody}>
            Our full deli menu is available online through Toast — our trusted ordering platform.
            Place your order ahead and it'll be ready when you arrive.
          </p>
          <a href={TOAST_URL} target="_blank" rel="noopener noreferrer">
            <button className={`btn-primary ${styles.toastBtn}`}>
              Go to Our Toast Page →
            </button>
          </a>
          <p className={styles.toastNote}>🔒 Secure ordering powered by Toast POS</p>
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
