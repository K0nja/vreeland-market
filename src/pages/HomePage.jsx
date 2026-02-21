import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Section, SectionLabel, SectionTitle } from '../components/Section'
import AdminModal from '../components/AdminModal'
import features from '../data/features'
import { api } from '../api/client'
import styles from './HomePage.module.css'

const DEFAULT_HERO = {
  headline: "Woodhaven's Favorite|Party Store.",
  sub: 'Craft beer, fine spirits, fresh deli, and more — all in one spot on Allen Road for over 35 years.',
  banner: '🍺 Check out our expanded bourbon selection — stop in and ask about our barrel picks!',
  showBanner: 'yes',
  callout: '',
}

const DEFAULT_CATERING = { categories: [] }

export default function HomePage() {
  const navigate = useNavigate()
  const [hero, setHero] = useState(DEFAULT_HERO)
  const [catering, setCatering] = useState(DEFAULT_CATERING)
  const [adminOpen, setAdminOpen] = useState(false)
  const [pwPrompt, setPwPrompt] = useState(false)
  const [pw, setPw] = useState('')
  const [pwErr, setPwErr] = useState(false)
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem('vreeland_token'))

  // Load hero from API
  useEffect(() => {
    api.getHero().then(setHero).catch(() => {})
    api.getCatering().then(setCatering).catch(() => {})
  }, [])

  const handleAdminOpen = () => {
    if (authed) setAdminOpen(true)
    else setPwPrompt(true)
  }

  // Secret keyboard shortcut: Ctrl + Shift + A
  useEffect(() => {
    const onKey = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') handleAdminOpen()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [authed])

  const handlePwSubmit = async () => {
    try {
      const { token } = await api.login(pw)
      sessionStorage.setItem('vreeland_token', token)
      setAuthed(true)
      setPwPrompt(false)
      setAdminOpen(true)
      setPwErr(false)
      setPw('')
    } catch {
      setPwErr(true)
    }
  }

  const headlineParts = hero.headline.split('|')

  return (
    <>
      {hero.showBanner === 'yes' && hero.banner && (
        <div className={styles.banner}>{hero.banner}</div>
      )}
      {hero.callout && (
        <div className={styles.calloutBar}>⚠️ {hero.callout}</div>
      )}

      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={`${styles.heroEyebrow} fade-in`}>
            Woodhaven, Michigan · Est. 1980s
          </div>
          <h1 className={`${styles.heroH1} fade-up delay-1`}>
            {headlineParts[0]}
            {headlineParts[1] && (<><br /><em>{headlineParts[1]}</em></>)}
          </h1>
          <p className={`${styles.heroSub} fade-up delay-2`}>{hero.sub}</p>
          <div className={`${styles.heroActions} fade-up delay-3`}>
            <button className="btn-primary" onClick={() => navigate('/order')}>Order Online</button>
            <button className="btn-outline" onClick={() => navigate('/catering')}>View Catering Menu</button>
          </div>
        </div>
        <div className={styles.scrollHint}>
          <span>Scroll</span>
          <span className={styles.scrollLine} />
        </div>
      </div>

      <Section>
        <SectionLabel>What We Offer</SectionLabel>
        <SectionTitle>More than just a party store.</SectionTitle>
        <p className={styles.sectionIntro}>
          Vreeland Market has been serving Woodhaven and the Downriver community for over 35 years.
          We carry everything from Michigan craft beer to imported wines, fresh deli food, and daily essentials.
        </p>
        <div className={styles.featuresGrid}>
          {features.map((f, i) => (
            <div key={f.title} className={`${styles.featureCard} fade-up delay-${(i % 4) + 1}`}>
              <div className={styles.featureIcon}>{f.icon}</div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div className={styles.ctaStrip}>
          <div>
            <h3 className={styles.ctaHeading}>Hosting a party?</h3>
            <p className={styles.ctaSub}>Let us handle the food. Browse our catering menu and order in advance.</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/catering')}>View Catering Menu →</button>
        </div>
      </Section>

      {pwPrompt && (
        <div className={styles.pwBackdrop} onClick={() => { setPwPrompt(false); setPwErr(false); setPw('') }}>
          <div className={styles.pwBox} onClick={e => e.stopPropagation()}>
            <h4 className={styles.pwHeading}>Admin Access</h4>
            <p className={styles.pwSub}>Enter the admin password to edit the site.</p>
            <input
              type="password" className={styles.pwInput} placeholder="Password"
              value={pw} onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handlePwSubmit()} autoFocus
            />
            {pwErr && <p className={styles.pwErr}>Incorrect password. Try again.</p>}
            <div className={styles.pwActions}>
              <button className={styles.pwCancel} onClick={() => { setPwPrompt(false); setPwErr(false); setPw('') }}>Cancel</button>
              <button className="btn-primary" onClick={handlePwSubmit}>Login</button>
            </div>
          </div>
        </div>
      )}

      {adminOpen && (
        <AdminModal
          hero={hero} setHero={setHero}
          catering={catering} setCatering={setCatering}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </>
  )
}
