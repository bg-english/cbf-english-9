import { useState, useEffect } from 'react'
import { roster } from '../../data/roster.js'
import { sendLoginNotification } from '../../hooks/usePDF.js'

export default function LoginGate({ onLogin }) {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [matched, setMatched] = useState(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimate(true), 80)
  }, [])

  const handleChange = (e) => {
    const val = e.target.value
    setEmail(val)
    setError('')
    const entry = roster[val.trim().toLowerCase()]
    setMatched(entry || null)
  }

  const doLogin = () => {
    const key = email.trim().toLowerCase()
    const entry = roster[key]
    if (!entry) { setError('That email is not registered in 9° RED or BLUE. Please check and try again.'); return }
    sendLoginNotification({ name: entry.name, email: key, section: entry.section })
    onLogin({ name: entry.name, email: key, section: entry.section })
  }

  const onKey = (e) => { if (e.key === 'Enter') doLogin() }

  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes floatJudah {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50%       { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes spinLogo {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.55); }
          70%  { box-shadow: 0 0 0 18px rgba(201,168,76,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        .login-card {
          animation: fadeSlideUp 0.55s cubic-bezier(.22,1,.36,1) both;
        }
        .judah-img {
          animation: floatJudah 3.6s ease-in-out infinite;
          filter: drop-shadow(0 18px 28px rgba(0,0,0,0.35));
        }
        .logo-spin:hover {
          animation: spinLogo 1.1s cubic-bezier(.22,1,.36,1);
        }
        .btn-enter {
          background: linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%);
          background-size: 200% auto;
          color: #1A2744;
          border: none;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.05rem;
          padding: 0.95rem 1.5rem;
          width: 100%;
          cursor: pointer;
          letter-spacing: 0.04em;
          transition: background-position 0.4s, transform 0.15s, box-shadow 0.15s;
          animation: pulse-ring 2.2s ease-out infinite;
        }
        .btn-enter:hover {
          background-position: right center;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(201,168,76,0.45);
        }
        .btn-enter:active { transform: translateY(0); }
        .login-input {
          width: 100%;
          padding: 0.88rem 1rem 0.88rem 2.8rem;
          border: 2px solid #EDE8DC;
          border-radius: 11px;
          font-size: 0.95rem;
          color: #1A1A1A;
          background: #FAF7F0;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .login-input:focus {
          border-color: #C9A84C;
          box-shadow: 0 0 0 3px rgba(201,168,76,0.18);
        }
        .stars-bg {
          position: fixed; inset: 0; pointer-events: none; overflow: hidden; z-index: 0;
        }
        .star {
          position: absolute;
          background: rgba(255,255,255,0.7);
          border-radius: 50%;
          animation: twinkle var(--d, 3s) ease-in-out infinite var(--delay, 0s);
        }
        @keyframes twinkle {
          0%,100% { opacity: 0.15; transform: scale(1); }
          50%      { opacity: 0.9;  transform: scale(1.4); }
        }
      `}</style>

      {/* Animated background */}
      <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(160deg, #0d1a35 0%, #1A2744 45%, #1E3A5F 100%)', zIndex: 0 }} />
      <div className="stars-bg">
        {Array.from({ length: 28 }).map((_, i) => (
          <div key={i} className="star" style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            '--d': `${2 + Math.random() * 3}s`,
            '--delay': `-${Math.random() * 4}s`,
          }} />
        ))}
      </div>

      {/* Gold bottom accent line */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, #C9A84C, #E8C96A, #C9A84C)', zIndex: 1 }} />

      <div style={{ position: 'fixed', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
        <div className="login-card" style={{ display: 'flex', alignItems: 'flex-end', gap: 0, maxWidth: 780, width: '100%', position: 'relative' }}>

          {/* Judah mascot */}
          <div style={{ flexShrink: 0, width: 210, marginBottom: -8, position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-end' }}>
            <img
              src={`${import.meta.env.BASE_URL}judah.png`}
              alt="Judah the Lion"
              className="judah-img"
              style={{ width: '100%', userSelect: 'none' }}
            />
          </div>

          {/* Login card */}
          <div style={{
            flex: 1,
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '0 24px 24px 0',
            padding: '2.6rem 2.4rem 2.4rem',
            boxShadow: '0 32px 80px rgba(0,0,0,0.45)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Top gold stripe */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg, #C9A84C, #E8C96A, #C9A84C)' }} />

            {/* Logo + title row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.4rem' }}>
              <img
                src={`${import.meta.env.BASE_URL}logo-boston.png`}
                alt="Boston Flex Logo"
                className="logo-spin"
                style={{ width: 64, height: 64, objectFit: 'contain', flexShrink: 0, cursor: 'pointer' }}
              />
              <div>
                <div style={{ fontSize: '0.7rem', color: '#7A7A7A', letterSpacing: '0.13em', textTransform: 'uppercase', fontWeight: 600 }}>
                  Colegio Boston Flexible · 9° RED
                </div>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.7rem', color: '#1A2744', fontWeight: 900, lineHeight: 1.15, margin: 0 }}>
                  Dreams &amp; <span style={{ color: '#C9A84C' }}>Ambitions</span>
                </h1>
                <div style={{ fontSize: '0.78rem', color: '#9A9A9A', marginTop: '0.15rem' }}>
                  Language Arts · 9th Grade · 2026
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 2, background: 'linear-gradient(90deg, #C9A84C33, #C9A84C, #C9A84C33)', borderRadius: 99, marginBottom: '1.4rem' }} />

            <p style={{ color: '#5A5A5A', fontSize: '0.88rem', marginBottom: '1.2rem', lineHeight: 1.5 }}>
              Enter your institutional email to access the platform. Only students from <strong>9° RED</strong> can log in.
            </p>

            {/* Match badge */}
            {matched && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(39,174,96,0.1), rgba(39,174,96,0.05))',
                border: '1.5px solid #27AE60',
                borderRadius: 10,
                padding: '0.7rem 1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.7rem',
                marginBottom: '1rem',
                animation: 'fadeSlideUp 0.3s ease',
              }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#27AE60,#1a6e3a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>👤</div>
                <div>
                  <div style={{ fontWeight: 700, color: '#1a6e3a', fontSize: '0.92rem' }}>{matched.name}</div>
                  <div style={{ fontSize: '0.74rem', color: '#2e8b57' }}>{email} · 9° {matched.section}</div>
                </div>
                <div style={{ marginLeft: 'auto', fontSize: '1.2rem' }}>✅</div>
              </div>
            )}

            {/* Error */}
            {error && (
              <div style={{ background: 'rgba(192,57,43,0.08)', border: '1.5px solid #C0392B', color: '#8B1A11', borderRadius: 9, padding: '0.65rem 1rem', fontSize: '0.83rem', fontWeight: 500, marginBottom: '1rem' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Email input */}
            <div style={{ position: 'relative', marginBottom: '1rem' }}>
              <span style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1rem', pointerEvents: 'none' }}>✉️</span>
              <input
                className="login-input"
                type="email"
                placeholder="yourname@redboston.edu.co"
                value={email}
                onChange={handleChange}
                onKeyDown={onKey}
                autoComplete="email"
                autoFocus
              />
            </div>

            <button className="btn-enter" onClick={doLogin}>
              Enter the Platform →
            </button>

            {/* Footer */}
            <div style={{ marginTop: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <div style={{ height: 1, flex: 1, background: '#EDE8DC' }} />
              <span style={{ fontSize: '0.7rem', color: '#AAAAAA', whiteSpace: 'nowrap' }}>
                "You intended it for good." — Gen 50:20
              </span>
              <div style={{ height: 1, flex: 1, background: '#EDE8DC' }} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
