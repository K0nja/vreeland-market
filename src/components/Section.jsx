import styles from './Section.module.css'

export function Section({ children, style }) {
  return (
    <section className={styles.section} style={style}>
      {children}
    </section>
  )
}

export function SectionLabel({ children }) {
  return (
    <div className={styles.label}>
      <span className={styles.labelLine} />
      {children}
    </div>
  )
}

export function SectionTitle({ children, light }) {
  return (
    <h2 className={`${styles.title} ${light ? styles.titleLight : ''}`}>
      {children}
    </h2>
  )
}
