import { useState } from 'react'

function highlight(text, vocab) {
  // Bold **word** markdown + vocab highlights
  const parts = []
  let remaining = text
  const boldRe = /\*\*(.+?)\*\*/g
  let last = 0
  let match
  while ((match = boldRe.exec(text)) !== null) {
    if (match.index > last) parts.push({ type: 'text', val: text.slice(last, match.index) })
    parts.push({ type: 'bold', val: match[1] })
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push({ type: 'text', val: text.slice(last) })
  return parts
}

function ReadingText({ text }) {
  return (
    <div style={{ lineHeight: 1.85, fontSize: '0.97rem', color: '#2A2A2A' }}>
      {text.map((block, i) => {
        const parts = highlight(block.para)
        return (
          <p key={i} style={{ marginBottom: '1rem' }}>
            {parts.map((p, j) =>
              p.type === 'bold'
                ? <strong key={j} style={{ color: '#1A2744', background: 'rgba(201,168,76,0.18)', borderRadius: 3, padding: '0 3px' }}>{p.val}</strong>
                : <span key={j}>{p.val}</span>
            )}
          </p>
        )
      })}
    </div>
  )
}

function MCQ({ q, idx, onAnswer }) {
  const [chosen, setChosen] = useState(null)
  const pick = i => { if (chosen !== null) return; setChosen(i); onAnswer(i === q.correct) }
  return (
    <div className="card" style={{ marginBottom: '1rem', borderLeft: '4px solid #C9A84C' }}>
      <div className="tag" style={{ marginBottom: '0.5rem' }}>Question {idx + 1} · Multiple Choice</div>
      <p style={{ fontWeight: 600, color: '#1A2744', marginBottom: '0.9rem', fontSize: '0.95rem' }}>{q.q}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        {q.options.map((opt, i) => {
          let bg = '#FAF7F0', border = '1.5px solid #EDE8DC', color = '#1A1A1A'
          if (chosen !== null) {
            if (i === q.correct) { bg = 'rgba(39,174,96,0.12)'; border = '1.5px solid #27AE60'; color = '#1a6e3a' }
            else if (i === chosen) { bg = 'rgba(192,57,43,0.1)'; border = '1.5px solid #C0392B'; color = '#8B1A11' }
          }
          return (
            <button key={i} onClick={() => pick(i)} disabled={chosen !== null}
              style={{ background: bg, border, borderRadius: 8, padding: '0.65rem 0.9rem', fontFamily: 'var(--font-body)', fontSize: '0.85rem', color, cursor: chosen !== null ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.15s', fontWeight: i === q.correct && chosen !== null ? 600 : 400 }}>
              {String.fromCharCode(65 + i)}. {opt}
            </button>
          )
        })}
      </div>
      {chosen !== null && (
        <div className={`feedback ${chosen === q.correct ? 'feedback-ok' : 'feedback-err'}`} style={{ marginTop: '0.7rem' }}>
          {chosen === q.correct ? '✓ ' : '✗ '}{q.feedback}
        </div>
      )}
    </div>
  )
}

function TFQ({ q, idx, onAnswer }) {
  const [chosen, setChosen] = useState(null)
  const pick = val => { if (chosen !== null) return; setChosen(val); onAnswer(val === q.correct) }
  return (
    <div className="card" style={{ marginBottom: '1rem', borderLeft: '4px solid #CC2936' }}>
      <div className="tag" style={{ marginBottom: '0.5rem', background: 'rgba(204,41,54,0.1)', color: '#CC2936' }}>Question {idx + 1} · True or False</div>
      <p style={{ fontWeight: 600, color: '#1A2744', marginBottom: '0.9rem', fontSize: '0.95rem' }}>{q.q}</p>
      <div style={{ display: 'flex', gap: '0.7rem' }}>
        {[true, false].map(val => {
          let bg = '#FAF7F0', border = '1.5px solid #EDE8DC', color = '#1A1A1A'
          if (chosen !== null) {
            if (val === q.correct) { bg = 'rgba(39,174,96,0.12)'; border = '1.5px solid #27AE60'; color = '#1a6e3a' }
            else if (val === chosen) { bg = 'rgba(192,57,43,0.1)'; border = '1.5px solid #C0392B'; color = '#8B1A11' }
          }
          return (
            <button key={String(val)} onClick={() => pick(val)} disabled={chosen !== null}
              style={{ flex: 1, padding: '0.75rem', borderRadius: 8, border, background: bg, fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, cursor: chosen !== null ? 'default' : 'pointer', color, transition: 'all 0.15s' }}>
              {val ? '✓ TRUE' : '✗ FALSE'}
            </button>
          )
        })}
      </div>
      {chosen !== null && (
        <div className={`feedback ${chosen === q.correct ? 'feedback-ok' : 'feedback-err'}`} style={{ marginTop: '0.7rem' }}>
          {chosen === q.correct ? '✓ ' : '✗ '}{q.feedback}
        </div>
      )}
    </div>
  )
}

export default function ReadingActivity({ reading, onScore, accentColor = '#C9A84C' }) {
  const [scores, setScores] = useState({})

  const handleAnswer = (idx, isCorrect) => {
    if (scores[idx] !== undefined) return
    const next = { ...scores, [idx]: isCorrect }
    setScores(next)
    const answered = Object.keys(next).length
    const correct = Object.values(next).filter(Boolean).length
    onScore?.({ correct, total: reading.questions.length, answered })
  }

  const answered = Object.keys(scores).length
  const correct = Object.values(scores).filter(Boolean).length
  const pct = answered > 0 ? Math.round((correct / answered) * 100) : 0

  return (
    <div>
      {/* Reading header */}
      <div style={{ background: `linear-gradient(135deg, #1A2744, #243356)`, borderRadius: 12, padding: '1.6rem 1.8rem', marginBottom: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${accentColor}, #E8921A, ${accentColor})` }} />
        <div style={{ display: 'inline-block', background: 'rgba(201,168,76,0.2)', border: '1px solid rgba(201,168,76,0.4)', color: '#F0D89A', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.25rem 0.8rem', borderRadius: 20, marginBottom: '0.7rem' }}>
          📖 Reading · {reading.tag}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#fff', fontSize: '1.45rem', fontWeight: 700, marginBottom: '0.25rem' }}>{reading.title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.83rem', fontStyle: 'italic' }}>{reading.subtitle}</p>
      </div>

      {/* Reading text */}
      <div className="card" style={{ borderLeft: `4px solid ${accentColor}`, marginBottom: '1.5rem' }}>
        <ReadingText text={reading.text} />
        <div style={{ marginTop: '1rem', paddingTop: '0.8rem', borderTop: '1px solid #EDE8DC', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          <span style={{ fontSize: '0.72rem', color: '#7A7A7A', fontWeight: 600, marginRight: '0.3rem' }}>Vocabulary in context:</span>
          {reading.vocabHighlights.map(v => (
            <span key={v} style={{ background: 'rgba(201,168,76,0.15)', color: '#8B6914', borderRadius: 4, padding: '0.1rem 0.5rem', fontSize: '0.72rem', fontWeight: 600 }}>{v}</span>
          ))}
        </div>
      </div>

      {/* Score tracker */}
      {answered > 0 && (
        <div style={{ background: '#1A2744', color: '#C9A84C', borderRadius: 8, padding: '0.5rem 1rem', fontSize: '0.82rem', fontWeight: 600, fontFamily: 'var(--font-mono)', marginBottom: '1.2rem', display: 'inline-block' }}>
          Reading Score: {correct}/{answered} · {pct}%
        </div>
      )}

      {/* Questions */}
      <p style={{ fontSize: '0.78rem', color: '#7A7A7A', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginBottom: '1rem' }}>
        Comprehension Questions — Answer based on the text above
      </p>
      {reading.questions.map((q, i) =>
        q.type === 'mc'
          ? <MCQ key={i} q={q} idx={i} onAnswer={c => handleAnswer(i, c)} />
          : <TFQ key={i} q={q} idx={i} onAnswer={c => handleAnswer(i, c)} />
      )}
    </div>
  )
}
