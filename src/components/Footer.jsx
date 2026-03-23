import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../data/navItems'
import { api } from '../api/client'
import styles from './Footer.module.css'

const DEFAULT_SOCIALS = [
  { label: 'Facebook', url: 'https://www.facebook.com/profile.php?id=100063559209172' },
  { label: 'Instagram', url: 'https://www.instagram.com/vreelandmarket' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@vreeland.market' },
  { label: 'X / Twitter', url: 'https://x.com/VreelandMarket' },
  { label: 'YouTube', url: 'https://www.youtube.com/@vreelandmarket8347' },
]

export default function Footer() {
  const [socials, setSocials] = useState(DEFAULT_SOCIALS)

  useEffect(() => {
    api.getSocials().then(setSocials).catch(() => {})
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>Vreeland Market</div>
          <p className={styles.tagline}>
            Woodhaven's favorite party store for over 35 years.
            <br />
            Largest craft beer &amp; bourbon selection Downriver.
          </p>
          <div className={styles.socials}>
            {socials.filter(s => s.url).map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title={s.label}>
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.col}>
          <h4 className={styles.colHeading}>Explore</h4>
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.path} to={item.path} className={styles.footerLink}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className={styles.col}>
          <h4 className={styles.colHeading}>Visit Us</h4>
          <address className={styles.address}>
            26796 Allen Rd
            <br />
            Woodhaven, MI 48183
            <br />
            <br />
            <a href="tel:+17346757006">(734) 675-7006</a>
            <br />
            <br />
            Sun–Wed: 9AM–10PM
            <br />
            Thu–Sat: 9AM–11PM
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Vreeland Market · Woodhaven, Michigan</span>
        <span>Built with ❤️ for the Vreeland family</span>
      </div>
    </footer>
  )
}
