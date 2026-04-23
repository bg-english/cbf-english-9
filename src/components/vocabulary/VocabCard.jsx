import { useState } from 'react'

export default function VocabCard({ num, term, def, ex }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen(o => !o)}
      style={{
        background: open ? '#fff' : '#FAF7F0',
        border: open ? '1.5px solid #C9A84C' : '1px solid #EDE8DC',
        borderRadius: 10,
        padding: '1.1rem 1.3rem',
        cursor: 'pointer',
        transition: 'all 0.22s',
        transform: open ? 'translateY(-2px)' : 'none',
        boxShadow: open ? '0 6px 20px rgba(201,168,76,0.15)' : 'none',
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#C9A84C', fontWeight: 600, display: 'block', marginBottom: '0.2rem' }}>#{num}</span>
      <div style={{ fontWeight: 600, color: '#1A2744', fontSize: '0.95rem' }}>{term}</div>
      {open && (
        <>
          <div style={{ fontSize: '0.85rem', color: '#4A4A4A', marginTop: '0.5rem', lineHeight: 1.55 }}>{def}</div>
          <div style={{ fontSize: '0.8rem', color: '#7A7A7A', fontStyle: 'italic', marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid #EDE8DC' }}>{ex}</div>
        </>
      )}
      <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: '#C9A84C', fontWeight: 600 }}>
        {open ? 'Click to collapse ↑' : 'Click to expand ↓'}
      </div>
    </div>
  )
}
