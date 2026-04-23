import { useState } from 'react'
import { practiceQuestions } from '../../data/practice.js'

function MCQuestion({ q, onAnswer, answered }) {
  const [chosen, setChosen] = useState(null)
  const pick = (i) => { if (answered) return; setChosen(i); onAnswer(i === q.correct) }
  return (
    <div className="card" style={{ marginBottom: '1.2rem' }}>
      <div className="tag" style={{ marginBottom: '0.6rem' }}>Multiple Choice</div>
      <p style={{ fontWeight: 500, color: '#1A2744', marginBottom: '1rem', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
        {q.options.map((opt, i) => {
          let bg = '#FAF7F0', border = '1.5px solid #EDE8DC', color = '#1A1A1A'
          if (chosen !== null) {
            if (i === q.correct) { bg = 'rgba(39,174,96,0.12)'; border = '1.5px solid #27AE60'; color = '#1a6e3a' }
            else if (i === chosen) { bg = 'rgba(192,57,43,0.1)'; border = '1.5px solid #C0392B'; color = '#8B1A11' }
          }
          return (
            <button key={i} onClick={() => pick(i)} disabled={chosen !== null}
              style={{ background: bg, border, borderRadius: 8, padding: '0.7rem 1rem', fontFamily: 'var(--font-body)', fontSize: '0.87rem', color, cursor: chosen !== null ? 'default' : 'pointer', textAlign: 'left', transition: 'all 0.18s', fontWeight: i === q.correct && chosen !== null ? 600 : 400 }}>
              {String.fromCharCode(65+i)}. {opt}
            </button>
          )
        })}
      </div>
      {chosen !== null && <div className={`feedback ${chosen === q.correct ? 'feedback-ok' : 'feedback-err'}`} style={{ marginTop: '0.8rem' }}>{chosen === q.correct ? '✓ ' : '✗ '}{q.feedback}</div>}
    </div>
  )
}

function TFQuestion({ q, onAnswer, answered }) {
  const [chosen, setChosen] = useState(null)
  const pick = (val) => { if (answered) return; setChosen(val); onAnswer(val === q.correct) }
  return (
    <div className="card" style={{ marginBottom: '1.2rem' }}>
      <div className="tag" style={{ marginBottom: '0.6rem' }}>True / False</div>
      <p style={{ fontWeight: 500, color: '#1A2744', marginBottom: '1rem', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'flex', gap: '0.8rem' }}>
        {[true, false].map(val => {
          let bg = '#FAF7F0', border = '1.5px solid #EDE8DC', color = '#1A1A1A'
          if (chosen !== null) {
            if (val === q.correct) { bg = 'rgba(39,174,96,0.12)'; border = '1.5px solid #27AE60'; color = '#1a6e3a' }
            else if (val === chosen) { bg = 'rgba(192,57,43,0.1)'; border = '1.5px solid #C0392B'; color = '#8B1A11' }
          }
          return (
            <button key={String(val)} onClick={() => pick(val)} disabled={chosen !== null}
              style={{ flex: 1, padding: '0.8rem', borderRadius: 8, border, background: bg, fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, cursor: chosen !== null ? 'default' : 'pointer', color, transition: 'all 0.18s' }}>
              {val ? 'TRUE ✓' : 'FALSE ✗'}
            </button>
          )
        })}
      </div>
      {chosen !== null && <div className={`feedback ${chosen === q.correct ? 'feedback-ok' : 'feedback-err'}`} style={{ marginTop: '0.8rem' }}>{chosen === q.correct ? '✓ ' : '✗ '}{q.feedback}</div>}
    </div>
  )
}

function MatchQuestion({ q }) {
  const [selected, setSelected] = useState(null)
  const [matches, setMatches] = useState({})
  const [wrongFlash, setWrongFlash] = useState(null)
  const shuffled = useState(() => [...q.pairs].sort(() => Math.random() - 0.5))[0]

  const selectLeft = (term) => {
    if (matches[term]) return
    setSelected(s => s?.side === 'left' && s.val === term ? null : { side: 'left', val: term })
  }
  const selectRight = (def) => {
    if (Object.values(matches).includes(def)) return
    if (selected?.side === 'left') {
      const pair = q.pairs.find(p => p.left === selected.val)
      if (pair?.right === def) {
        setMatches(m => ({ ...m, [selected.val]: def }))
        setSelected(null)
      } else {
        setWrongFlash(def)
        setTimeout(() => setWrongFlash(null), 600)
        setSelected(null)
      }
    } else {
      setSelected(s => s?.side === 'right' && s.val === def ? null : { side: 'right', val: def })
    }
  }

  const allDone = Object.keys(matches).length === q.pairs.length

  return (
    <div className="card" style={{ marginBottom: '1.2rem' }}>
      <div className="tag" style={{ marginBottom: '0.6rem' }}>Matching</div>
      <p style={{ fontWeight: 500, color: '#1A2744', marginBottom: '1rem', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div>
          <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7A7A7A', fontWeight: 600, marginBottom: '0.7rem' }}>Expressions</p>
          {q.pairs.map((p, i) => {
            const matched = !!matches[p.left]
            const isSelected = selected?.side === 'left' && selected.val === p.left
            return (
              <div key={i} onClick={() => !matched && selectLeft(p.left)}
                style={{ background: matched ? 'rgba(39,174,96,0.1)' : isSelected ? 'rgba(26,39,68,0.08)' : '#FAF7F0', border: `1.5px solid ${matched ? '#27AE60' : isSelected ? '#1A2744' : '#EDE8DC'}`, borderRadius: 8, padding: '0.65rem 1rem', marginBottom: '0.5rem', fontSize: '0.87rem', cursor: matched ? 'default' : 'pointer', color: matched ? '#1a6e3a' : '#1A1A1A', fontWeight: isSelected || matched ? 600 : 400, transition: 'all 0.18s', minHeight: 40, display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '0.5rem', color: '#C9A84C', fontWeight: 700 }}>{i+1}.</span>{p.left}
              </div>
            )
          })}
        </div>
        <div>
          <p style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7A7A7A', fontWeight: 600, marginBottom: '0.7rem' }}>Meanings</p>
          {shuffled.map((p, i) => {
            const matched = Object.values(matches).includes(p.right)
            const isSelected = selected?.side === 'right' && selected.val === p.right
            const isWrong = wrongFlash === p.right
            return (
              <div key={i} onClick={() => !matched && selectRight(p.right)}
                style={{ background: isWrong ? 'rgba(192,57,43,0.1)' : matched ? 'rgba(39,174,96,0.1)' : isSelected ? 'rgba(201,168,76,0.1)' : '#FAF7F0', border: `1.5px solid ${isWrong ? '#C0392B' : matched ? '#27AE60' : isSelected ? '#C9A84C' : '#EDE8DC'}`, borderRadius: 8, padding: '0.65rem 1rem', marginBottom: '0.5rem', fontSize: '0.87rem', cursor: matched ? 'default' : 'pointer', color: matched ? '#1a6e3a' : '#1A1A1A', fontWeight: matched ? 600 : 400, transition: 'all 0.18s', minHeight: 40, display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '0.5rem', color: '#3A4F7A', fontWeight: 600 }}>{String.fromCharCode(65+i)}.</span>{p.right}
              </div>
            )
          })}
        </div>
      </div>
      {allDone && <div className="feedback feedback-ok" style={{ marginTop: '0.8rem' }}>✓ All matched correctly! Excellent work!</div>}
    </div>
  )
}

export default function PracticeSection() {
  const [scores, setScores] = useState({ correct: 0, answered: 0 })
  const [answered, setAnswered] = useState({})

  const handleAnswer = (idx, isCorrect) => {
    if (answered[idx] !== undefined) return
    setAnswered(a => ({ ...a, [idx]: isCorrect }))
    setScores(s => ({ correct: s.correct + (isCorrect ? 1 : 0), answered: s.answered + 1 }))
  }

  const gradeable = practiceQuestions.filter(q => q.type !== 'match').length
  const pct = scores.answered > 0 ? Math.round((scores.correct / scores.answered) * 100) : 0

  return (
    <div className="section-wrap">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="section-title">Practice</div>
          <div className="section-sub">Vocabulary · Grammar · All Question Types</div>
        </div>
        <div style={{ background: '#1A2744', color: '#C9A84C', fontFamily: 'var(--font-mono)', fontSize: '0.84rem', padding: '0.4rem 1rem', borderRadius: 20, fontWeight: 600 }}>
          Score: {scores.correct} / {scores.answered} · {pct}%
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background: '#EDE8DC', borderRadius: 20, height: 8, marginBottom: '2rem' }}>
        <div style={{ height: 8, borderRadius: 20, background: 'linear-gradient(90deg, #8B6914, #C9A84C)', width: `${Math.round((scores.answered / gradeable) * 100)}%`, transition: 'width 0.5s ease' }} />
      </div>

      {practiceQuestions.map((q, i) => {
        if (q.type === 'mc') return <MCQuestion key={i} q={q} onAnswer={c => handleAnswer(i, c)} answered={answered[i] !== undefined} />
        if (q.type === 'tf') return <TFQuestion key={i} q={q} onAnswer={c => handleAnswer(i, c)} answered={answered[i] !== undefined} />
        if (q.type === 'match') return <MatchQuestion key={i} q={q} />
        return null
      })}
    </div>
  )
}
