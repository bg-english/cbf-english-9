export default function Hero() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1A2744 0%, #243356 55%, #2A1A2A 100%)',
      padding: '4rem 2rem 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Warm radial glow — amber top left */}
      <div style={{ position: 'absolute', top: '-40px', left: '-60px', width: 380, height: 380, background: 'radial-gradient(circle, rgba(232,146,26,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
      {/* Crimson glow — bottom right */}
      <div style={{ position: 'absolute', bottom: 0, right: 0, width: 320, height: 320, background: 'radial-gradient(circle, rgba(204,41,54,0.14) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>

        {/* Left: logo + text */}
        <div style={{ flex: 1, minWidth: 280, paddingBottom: '3.5rem' }}>
          {/* Logo + badge row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <img
              src={`${import.meta.env.BASE_URL}logo-boston.png`}
              alt="Boston Flex"
              style={{ width: 72, height: 72, objectFit: 'contain', filter: 'drop-shadow(0 4px 12px rgba(201,168,76,0.5))' }}
            />
            <div style={{
              background: 'linear-gradient(135deg, rgba(204,41,54,0.3), rgba(201,168,76,0.15))',
              border: '1px solid rgba(201,168,76,0.4)',
              color: '#F0D89A',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '0.4rem 1rem',
              borderRadius: 20,
            }}>
              Evolve 4 · Colegio Boston Flexible · 2026
            </div>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            color: '#fff',
            fontWeight: 900,
            lineHeight: 1.15,
            marginBottom: '1rem',
          }}>
            Dreams &amp; <span style={{ color: '#E8921A' }}>Ambitions</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1.02rem', maxWidth: 560, marginBottom: '1.8rem', lineHeight: 1.65 }}>
            Explore language, purpose, and faith as you discover what it means to pursue your God-given potential.
          </p>

          {/* Verse block */}
          <div style={{
            background: 'rgba(204,41,54,0.12)',
            borderLeft: '4px solid #CC2936',
            borderRadius: '0 10px 10px 0',
            padding: '1rem 1.4rem',
            maxWidth: 620,
          }}>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', fontSize: '0.92rem', marginBottom: '0.35rem' }}>
              "You intended to harm me, but God intended it for good to accomplish what is now being done, the saving of many lives."
            </p>
            <cite style={{ color: '#E8921A', fontSize: '0.78rem', fontStyle: 'normal', fontWeight: 700, letterSpacing: '0.05em' }}>
              — Genesis 50:20 (NIV) · Unit Verse
            </cite>
          </div>
        </div>

        {/* Right: Judah floating */}
        <div style={{ flexShrink: 0, width: 'clamp(160px, 22vw, 240px)', alignSelf: 'flex-end', position: 'relative' }}>
          <img
            src={`${import.meta.env.BASE_URL}judah.png`}
            alt="Judah the Lion"
            style={{
              width: '100%',
              display: 'block',
              animation: 'judah-bob 3.8s ease-in-out infinite',
              filter: 'drop-shadow(0 24px 32px rgba(0,0,0,0.5))',
              userSelect: 'none',
            }}
          />
        </div>
      </div>

      {/* Bottom wave divider */}
      <div style={{ marginTop: '-1px', lineHeight: 0 }}>
        <svg viewBox="0 0 1200 50" preserveAspectRatio="none" style={{ width: '100%', height: 50, display: 'block' }}>
          <path d="M0,0 C300,50 900,0 1200,40 L1200,50 L0,50 Z" fill="#FBF8F2" />
        </svg>
      </div>
    </div>
  )
}
