export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1A2744 0%, #243356 100%)',
      borderTop: '4px solid #CC2936',
      marginTop: '3rem',
      padding: '2.5rem 1.5rem 2rem',
    }}>
      {/* Gold accent line under crimson */}
      <div style={{ height: 2, background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', marginBottom: '2rem', maxWidth: 400, margin: '0 auto 2rem' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>

        {/* Logo + Judah row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <img
            src={`${import.meta.env.BASE_URL}judah.png`}
            alt="Judah"
            style={{ width: 52, height: 52, objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
          />
          <img
            src={`${import.meta.env.BASE_URL}logo-boston.png`}
            alt="Boston Flex"
            style={{ width: 56, height: 56, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(201,168,76,0.4))' }}
          />
        </div>

        {/* Name */}
        <div style={{ fontFamily: 'var(--font-display)', color: '#C9A84C', fontSize: '1.05rem', fontWeight: 700, letterSpacing: '0.05em' }}>
          Colegio Boston Flexible
        </div>

        {/* Details */}
        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.78rem', textAlign: 'center', lineHeight: 1.9 }}>
          9th Grade English · Evolve 4 · Teacher: Edoardo Ortiz
          <br />
          <span style={{ color: '#CC2936', fontWeight: 600 }}>Año de la Pureza</span>
          <span style={{ color: 'rgba(255,255,255,0.35)' }}> · 2026</span>
        </div>

        {/* Verse */}
        <div style={{
          color: 'rgba(255,255,255,0.35)',
          fontStyle: 'italic',
          fontSize: '0.72rem',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '1rem',
          marginTop: '0.5rem',
          textAlign: 'center',
        }}>
          "You intended to harm me, but God intended it for good." — Gen 50:20
        </div>
      </div>
    </footer>
  )
}
