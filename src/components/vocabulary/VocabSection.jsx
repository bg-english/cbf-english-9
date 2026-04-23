import { useState } from 'react'
import { units } from '../../data/vocab.js'
import VocabCard from './VocabCard.jsx'

export default function VocabSection() {
  const [activeUnit, setActiveUnit] = useState(0)
  const unit = units[activeUnit]

  return (
    <div className="section-wrap">
      <div className="section-title">Vocabulary</div>
      <div className="section-sub">Three Units · Click a card to expand definition &amp; example</div>

      {/* Unit tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {units.map((u, i) => (
          <button
            key={u.id}
            onClick={() => setActiveUnit(i)}
            style={{
              background: activeUnit === i ? '#1A2744' : '#FAF7F0',
              border: `1px solid ${activeUnit === i ? '#1A2744' : '#EDE8DC'}`,
              color: activeUnit === i ? '#C9A84C' : '#4A4A4A',
              borderRadius: 8, padding: '0.5rem 1.1rem', fontSize: '0.84rem', fontWeight: 500,
              cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)',
            }}
          >
            {u.emoji} {u.label}
          </button>
        ))}
      </div>

      <div className="card card-gold" style={{ marginBottom: '1.5rem' }}>
        <p style={{ color: '#4A4A4A', fontSize: '0.88rem' }}><strong style={{ color: '#1A2744' }}>{unit.label}</strong> — {unit.description}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {unit.words.map(w => <VocabCard key={w.num} {...w} />)}
      </div>

      {unit.petVocab && (
        <>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#1A2744', margin: '2.5rem 0 1rem', borderBottom: '2px solid #F0D89A', paddingBottom: '0.5rem' }}>
            Pet Vocabulary · General Dictionary Terms
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
            {unit.petVocab.map(w => <VocabCard key={w.num} {...w} />)}
          </div>
        </>
      )}
    </div>
  )
}
