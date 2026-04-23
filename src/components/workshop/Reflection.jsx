import { useState } from 'react'
import { reflectionQuestions } from '../../data/workshop.js'

export default function Reflection({ onChange }) {
  const [answers, setAnswers] = useState(['', '', ''])

  const update = (idx, val) => {
    const next = [...answers]
    next[idx] = val
    setAnswers(next)
    onChange(next)
  }

  return (
    <div>
      <p style={{ color: '#4A4A4A', fontSize: '0.87rem', marginBottom: '1.2rem' }}>
        Answer the following questions in complete English sentences. These are open-ended — your personal perspective matters. Minimum 2-3 sentences each.
      </p>
      {reflectionQuestions.map((q, idx) => (
        <div key={idx} style={{ marginBottom: '1.5rem' }}>
          <p style={{ fontWeight: 600, color: '#1A2744', marginBottom: '0.6rem', fontSize: '0.92rem', lineHeight: 1.5 }}>
            <span style={{ display: 'inline-block', background: '#C9A84C', color: '#1A2744', borderRadius: 4, padding: '0.1rem 0.5rem', fontSize: '0.72rem', fontWeight: 700, marginRight: '0.5rem', verticalAlign: 'middle' }}>{idx + 1}</span>
            {q}
          </p>
          <textarea
            rows={4}
            value={answers[idx]}
            onChange={e => update(idx, e.target.value)}
            placeholder="Write your answer here in English..."
            style={{ width: '100%', padding: '0.8rem 1rem', border: '1.5px solid #EDE8DC', borderRadius: 8, fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: '#1A1A1A', background: '#FAF7F0', resize: 'vertical', outline: 'none', lineHeight: 1.6, transition: 'border-color 0.2s' }}
            onFocus={e => e.target.style.borderColor = '#C9A84C'}
            onBlur={e => e.target.style.borderColor = '#EDE8DC'}
          />
          <p style={{ fontSize: '0.74rem', color: '#7A7A7A', marginTop: '0.3rem' }}>
            {answers[idx].trim().length > 0 ? `${answers[idx].trim().split(/\s+/).length} words` : 'Not answered yet'}
          </p>
        </div>
      ))}
    </div>
  )
}
