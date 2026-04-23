import { useState } from 'react'
import { roster } from '../../data/roster.js'

const styles = {
  overlay: { position: 'fixed', inset: 0, background: 'linear-gradient(135deg, #1A2744 0%, #243356 60%, #1E3A5F 100%)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' },
  box: { background: '#fff', borderRadius: 20, padding: '3rem 2.5rem', maxWidth: 440, width: '100%', textAlign: 'center', boxShadow: '0 24px 80px rgba(0,0,0,0.4)' },
  logo: { fontFamily: 'var(--font-display)', fontSize: '0.82rem', color: '#7A7A7A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.3rem' },
  title: { fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#1A2744', fontWeight: 900, marginBottom: '0.3rem' },
  gold: { color: '#C9A84C' },
  sub: { color: '#7A7A7A', fontSize: '0.84rem', marginBottom: '2rem' },
  inputWrap: { position: 'relative', marginBottom: '1rem' },
  icon: { position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' },
  input: { width: '100%', padding: '0.85rem 1rem 0.85rem 2.7rem', border: '1.5px solid #EDE8DC', borderRadius: 10, fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: '#1A1A1A', background: '#FAF7F0', outline: 'none', transition: 'border-color 0.2s' },
  error: { background: 'rgba(192,57,43,0.08)', border: '1px solid #C0392B', color: '#8B1A11', borderRadius: 8, padding: '0.7rem 1rem', fontSize: '0.84rem', fontWeight: 500, marginBottom: '1rem', textAlign: 'left' },
  badge: { background: 'rgba(39,174,96,0.1)', border: '1px solid #27AE60', borderRadius: 10, padding: '0.8rem 1rem', display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.2rem', textAlign: 'left' },
  hint: { marginTop: '1.5rem', fontSize: '0.74rem', color: '#7A7A7A' },
}

export default function LoginGate({ onLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [matched, setMatched] = useState(null)

  const handleChange = (e) => {
    const val = e.target.value
    setEmail(val)
    setError('')
    const name = roster[val.trim().toLowerCase()]
    setMatched(name || null)
  }

  const doLogin = () => {
    const key = email.trim().toLowerCase()
    const name = roster[key]
    if (!name) { setError('That email is not registered in 9° RED. Please check and try again.'); return }
    onLogin({ name, email: key })
  }

  const onKey = (e) => { if (e.key === 'Enter') doLogin() }

  return (
    <div style={styles.overlay}>
      <div style={styles.box}>
        <p style={styles.logo}>Colegio Boston Flexible · 9th Grade RED</p>
        <h1 style={styles.title}>Dreams &amp; <span style={styles.gold}>Ambitions</span></h1>
        <p style={styles.sub}>Enter your institutional email to access the platform</p>

        {matched && (
          <div style={styles.badge}>
            <span style={{ fontSize: '1.4rem' }}>👤</span>
            <div>
              <div style={{ fontWeight: 600, color: '#1a6e3a', fontSize: '0.9rem' }}>{matched}</div>
              <div style={{ fontSize: '0.76rem', color: '#2e8b57' }}>{email}</div>
            </div>
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.inputWrap}>
          <span style={styles.icon}>✉️</span>
          <input
            style={styles.input}
            type="email"
            placeholder="yourname@redboston.edu.co"
            value={email}
            onChange={handleChange}
            onKeyDown={onKey}
            autoComplete="email"
            onFocus={e => e.target.style.borderColor = '#C9A84C'}
            onBlur={e => e.target.style.borderColor = '#EDE8DC'}
          />
        </div>

        <button className="btn-gold" style={{ width: '100%', fontSize: '1rem', padding: '0.9rem' }} onClick={doLogin}>
          Enter →
        </button>
        <p style={styles.hint}>Only students from 9° RED · CBF 2026 can access this platform.</p>
      </div>
    </div>
  )
}
