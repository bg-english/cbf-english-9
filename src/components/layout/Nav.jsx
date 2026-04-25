const navItems = [
  { id: 'vocabulary', label: '📚 Vocabulary' },
  { id: 'grammar',    label: '✏️ Grammar'    },
  { id: 'practice',   label: '🎯 Practice'   },
  { id: 'biblical',   label: '✝️ Biblical'   },
  { id: 'workshop',   label: '🏆 Workshop'   },
]

export default function Nav({ active, onNav }) {
  return (
    <nav style={{
      background: 'linear-gradient(90deg, #1A2744 0%, #243356 100%)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '3px solid #CC2936',
      boxShadow: '0 2px 16px rgba(26,39,68,0.35)',
    }}>
      {/* Thin gold line above crimson */}
      <div style={{ height: 3, background: 'linear-gradient(90deg, #C9A84C, #E8921A, #C9A84C)', marginBottom: 0 }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 4, padding: '0 1.2rem', flexWrap: 'wrap' }}>

        {/* Logo + brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginRight: '1.2rem', padding: '0.4rem 0' }}>
          <img
            src={`${import.meta.env.BASE_URL}logo-boston.png`}
            alt="Boston Flex"
            style={{ width: 38, height: 38, objectFit: 'contain', borderRadius: '50%', boxShadow: '0 0 0 2px #C9A84C' }}
          />
          <div>
            <div style={{ fontFamily: 'var(--font-display)', color: '#C9A84C', fontSize: '0.95rem', fontWeight: 700, lineHeight: 1.1 }}>CBF · 9th Grade</div>
            <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>English · 2026</div>
          </div>
        </div>

        {/* Nav items */}
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', flex: 1 }}>
          {navItems.map(item => {
            const isActive = active === item.id
            return (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                style={{
                  background: isActive ? 'rgba(204,41,54,0.25)' : 'none',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #CC2936' : '3px solid transparent',
                  color: isActive ? '#F0D89A' : 'rgba(255,255,255,0.65)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  padding: '0.7rem 0.9rem',
                  cursor: 'pointer',
                  transition: 'all 0.18s',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.02em',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#F0D89A'
                    e.currentTarget.style.background = 'rgba(201,168,76,0.12)'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.65)'
                    e.currentTarget.style.background = 'none'
                  }
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Judah mini avatar */}
        <img
          src={`${import.meta.env.BASE_URL}judah.png`}
          alt="Judah"
          style={{ width: 42, height: 42, objectFit: 'contain', marginLeft: '0.5rem', animation: 'judah-bob 3s ease-in-out infinite', flexShrink: 0 }}
        />
      </div>
    </nav>
  )
}
