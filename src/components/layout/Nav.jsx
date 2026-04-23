const navItems = [
  { id: 'vocabulary', label: '📚 Vocabulary' },
  { id: 'grammar',    label: '✏️ Grammar' },
  { id: 'practice',   label: '🎯 Practice' },
  { id: 'biblical',   label: '✝️ Biblical' },
  { id: 'workshop',   label: '🏆 Workshop' },
]

export default function Nav({ active, onNav }) {
  return (
    <nav style={{ background: '#1A2744', position: 'sticky', top: 0, zIndex: 100, borderBottom: '2px solid #C9A84C' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 4, padding: '0 1.5rem', flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-display)', color: '#C9A84C', fontSize: '1rem', fontWeight: 700, padding: '0.75rem 0', marginRight: '1rem', whiteSpace: 'nowrap' }}>
          CBF · 9th Grade
        </span>
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              background: active === item.id ? 'rgba(201,168,76,0.2)' : 'none',
              border: 'none',
              borderBottom: active === item.id ? '2px solid #C9A84C' : '2px solid transparent',
              color: active === item.id ? '#C9A84C' : 'rgba(255,255,255,0.7)',
              fontFamily: 'var(--font-body)',
              fontSize: '0.82rem',
              fontWeight: 500,
              padding: '0.55rem 0.9rem',
              cursor: 'pointer',
              borderRadius: active === item.id ? '6px 6px 0 0' : 6,
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}
            onMouseEnter={e => { if (active !== item.id) { e.currentTarget.style.color = '#F0D89A'; e.currentTarget.style.background = 'rgba(201,168,76,0.1)' } }}
            onMouseLeave={e => { if (active !== item.id) { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'none' } }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  )
}
