import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../data/navItems'
import styles from './Footer.module.css'

export default function Footer() {
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
