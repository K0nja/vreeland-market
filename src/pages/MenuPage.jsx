import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Section, SectionLabel, SectionTitle } from '../components/Section'
import { api } from '../api/client'
import menuFallback from '../data/menuData'
import styles from './CateringPage.module.css'

export default function MenuPage() {
  const navigate = useNavigate()
  const [categories, setCategories] = useState(menuFallback)
  const [activeTab, setActiveTab] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getMenu()
      .then(data => {
        if (data.categories?.length) setCategories(data.categories)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div style={{ minHeight: '100vh', background: 'var(--ink)' }} />

  return (
    <>
      <div className={`${styles.hero} page-hero`} style={{ background: 'var(--ink)' }}>
        <div className={styles.heroInner}>
          <div className="page-hero__eyebrow page-hero__eyebrow--amber">Deli Menu</div>
          <h1 style={{ color: '#fff' }}>Fresh Made Daily</h1>
          <p style={{ color: '#999' }}>
            Sandwiches, pizza, sides, and more — made fresh in-store or order ahead online.
          </p>
        </div>
      </div>

      <Section>
        <SectionLabel>Menu</SectionLabel>
        <SectionTitle>What We're Making Today</SectionTitle>
        <p className={styles.intro}>
          Stop in or order ahead on{' '}
          <button
            className={styles.phone}
            style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}
            onClick={() => navigate('/order')}
          >
            Toast, Grubhub, DoorDash, or Uber Eats
          </button>
          . Call us at{' '}
          <a href="tel:+17346757006" className={styles.phone}>(734) 675-7006</a>{' '}
          for daily specials.
        </p>

        <div className={styles.tabs}>
          {categories.map((cat, i) => (
            <button
              key={cat.category}
              className={`${styles.tab} ${activeTab === i ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {cat.category}
            </button>
          ))}
        </div>

        <div className={styles.menuGrid}>
          {categories[activeTab]?.items.map((item) => (
            <div key={item.name} className={`${styles.menuItem} fade-in`}>
              <div className={styles.menuInfo}>
                <div className={styles.menuName}>{item.name}</div>
                {item.desc && <div className={styles.menuDesc}>{item.desc}</div>}
              </div>
              <div className={styles.menuPrice}>{item.price}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--ink-light)', marginTop: '32px', fontStyle: 'italic' }}>
          * Prices subject to change. See in-store for current pricing.
        </p>

        <div className={styles.cta}>
          <h3 className={styles.ctaHeading}>Order Online</h3>
          <p className={styles.ctaSub}>
            Skip the wait — place your order ahead on any of our delivery and pickup platforms.
          </p>
          <button className="btn-primary" style={{ fontSize: '1rem', padding: '14px 36px' }} onClick={() => navigate('/order')}>
            Order Now →
          </button>
        </div>
      </Section>
    </>
  )
}
