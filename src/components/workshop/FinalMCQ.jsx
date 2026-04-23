import { useState } from 'react'
import { workshopMCQ } from '../../data/workshop.js'

export default function FinalMCQ({ onScore }) {
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)

  const pick = (idx, chosen) => {
    if (checked) return
    setAnswers(a => ({ ...a, [idx]: chosen }))
  }

  const check = () => {
    setChecked(true)
    const correct = workshopMCQ.filter((item, i) => answers[i] === item.correct).length
    onScore({ correct, total: workshopMCQ.length, answers })
  }

  return (
    <div>
      <p style={{ color: '#4A4A4A', fontSize: '0.87rem', marginBottom: '1.2rem' }}>
        Choose the best answer for each question. This section covers all three units.
      </p>
      {workshopMCQ.map((item, idx) => {
        const chosen = answers[idx]
        return (
          <div key={idx} style={{ background: '#fff', border: '1px solid #EDE8DC', borderRadius: 10, padding: '1.4rem', marginBottom: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <p style={{ fontWeight: 500, color: '#1A2744', marginBottom: '0.9rem', fontSize: '0.96rem' }}>
              <span style={{ color: '#C9A84C', fontFamily: 'var(--font-mono)', fontWeight: 700, marginRight: '0.5rem' }}>{idx + 1}.</span>
              {item.q}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {item.opts.map((opt, oi) => {
                let bg = '#FAF7F0', border = '1.5px solid #EDE8DC', color = '#1A1A1A'
                if (checked) {
                  if (oi === item.correct) { bg = 'rgba(39,174,96,0.12)'; border = '1.5px solid #27AE60'; color = '#1a6e3a' }
                  else if (oi === chosen && oi !== item.correct) { bg = 'rgba(192,57,43,0.09)'; border = '1.5px solid #C0392B'; color = '#8B1A11' }
                } else if (oi === chosen) {
                  bg = 'rgba(26,39,68,0.07)'; border = '1.5px solid #1A2744'
                }
                return (
                  <button key={oi} onClick={() => pick(idx, oi)} disabled={checked}
                    style={{ background: bg, border, borderRadius: 7, padding: '0.6rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.86rem', color, cursor: checked ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.15s', fontWeight: (checked && oi === item.correct) ? 700 : 400 }}>
                    {String.fromCharCode(65 + oi)}. {opt}
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
      {!checked && (
        <button className="btn-primary" onClick={check} style={{ marginTop: '0.5rem' }}>
          Check All Answers
        </button>
      )}
      {checked && (
        <div style={{ background: 'rgba(26,39,68,0.06)', borderRadius: 10, padding: '1rem 1.4rem', marginTop: '0.5rem', fontWeight: 600, color: '#1A2744' }}>
          Score: {workshopMCQ.filter((item, i) => answers[i] === item.correct).length} / {workshopMCQ.length}
        </div>
      )}
    </div>
  )
}
