export default function Hero() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #1A2744 0%, #243356 60%, #1E3A5F 100%)', padding: '5rem 2rem 4rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 40%, rgba(201,168,76,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.4)', color: '#F0D89A', fontSize: '0.74rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.35rem 1rem', borderRadius: 20, marginBottom: '1.5rem' }}>
        Evolve 4 · Colegio Boston Flexible · 2026
      </div>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', color: '#fff', fontWeight: 900, lineHeight: 1.15, marginBottom: '1rem' }}>
        Dreams &amp; <span style={{ color: '#C9A84C' }}>Ambitions</span>
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.05rem', maxWidth: 620, margin: '0 auto 2rem' }}>
        Explore language, purpose, and faith as you discover what it means to pursue your God-given potential.
      </p>
      <div style={{ background: 'rgba(201,168,76,0.1)', borderLeft: '3px solid #C9A84C', borderRadius: '0 8px 8px 0', padding: '1rem 1.5rem', maxWidth: 680, margin: '0 auto', textAlign: 'left' }}>
        <p style={{ color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', fontSize: '0.94rem', marginBottom: '0.3rem' }}>
          "You intended to harm me, but God intended it for good to accomplish what is now being done, the saving of many lives."
        </p>
        <cite style={{ color: '#C9A84C', fontSize: '0.79rem', fontStyle: 'normal', fontWeight: 600, letterSpacing: '0.05em' }}>
          — Genesis 50:20 (NIV) · Unit Verse
        </cite>
      </div>
    </div>
  )
}
