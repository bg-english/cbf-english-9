import { useState } from 'react'
import WordSearch from './WordSearch.jsx'
import FillIn from './FillIn.jsx'
import FinalMCQ from './FinalMCQ.jsx'
import Reflection from './Reflection.jsx'
import { WS_WORDS, fillInItems, workshopMCQ } from '../../data/workshop.js'
import { generatePDF, sendToTelegram } from '../../hooks/usePDF.js'

function SectionCard({ number, title, children }) {
  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', paddingBottom: '1rem', borderBottom: '2px solid #F0D89A' }}>
        <div style={{ background: '#1A2744', color: '#C9A84C', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{number}</div>
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', fontSize: '1.1rem', fontWeight: 700 }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

export default function WorkshopSection({ user }) {
  const [wsFound, setWsFound] = useState(0)
  const [fiScore, setFiScore] = useState(null)
  const [mcqScore, setMcqScore] = useState(null)
  const [reflections, setReflections] = useState(['', '', ''])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [finalPct, setFinalPct] = useState(0)

  const handleSubmit = async () => {
    if (submitting || submitted) return
    setSubmitting(true)
    setError('')

    const fiCorrect = fiScore?.correct ?? 0
    const mcqCorrect = mcqScore?.correct ?? 0
    const total = fiCorrect + mcqCorrect + wsFound
    const max = fillInItems.length + workshopMCQ.length + WS_WORDS.length
    const pct = Math.round((total / max) * 100)
    setFinalPct(pct)

    const breakdown = {
      fiCorrect, fiTotal: fillInItems.length,
      mcqCorrect, mcqTotal: workshopMCQ.length,
      wsFound, wsTotal: WS_WORDS.length,
    }

    try {
      const pdfBlob = generatePDF({
        name: user.name,
        email: user.email,
        pct,
        breakdown,
        reflections,
        fiAnswers: fiScore?.answers,
        mcqAnswers: mcqScore?.answers,
      })

      // Download for student
      const url = URL.createObjectURL(pdfBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `CBF_Workshop_${user.name.replace(/\s+/g, '_')}.pdf`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 5000)

      // Send to Telegram
      await sendToTelegram({
        name: user.name,
        email: user.email,
        pctDisplay: `${pct}% (${total}/${max})`,
        breakdown,
        reflections,
        pdfBlob,
      })

      setSubmitted(true)
      setShowModal(true)
    } catch (e) {
      setError('Could not send to Telegram: ' + e.message + '. Your PDF was still downloaded.')
      setShowModal(true)
    } finally {
      setSubmitting(false)
    }
  }

  const grade = finalPct >= 80 ? 'Excellent! 🌟' : finalPct >= 60 ? 'Good work! 👍' : 'Keep practicing! 💪'

  return (
    <div className="section-wrap">
      <div className="section-title">Workshop</div>
      <div className="section-sub">Autocorrected · PDF Generated · Sent to Teacher via Telegram</div>

      {/* Intro */}
      <div style={{ background: '#1A2744', borderRadius: 12, padding: '1.8rem 2rem', color: '#fff', marginBottom: '2rem', display: 'flex', gap: '1.4rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ fontSize: '2.8rem' }}>🏆</div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', color: '#C9A84C', fontSize: '1.3rem', marginBottom: '0.4rem' }}>Unit Assessment Workshop</h3>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem', lineHeight: 1.6 }}>
            Complete all activities below. When you click <strong style={{ color: '#C9A84C' }}>Submit</strong>, your workshop is autocorrected, a PDF is downloaded to your device, and your results are sent directly to your teacher.
          </p>
        </div>
      </div>

      {/* Student badge */}
      <div style={{ background: '#fff', border: '1px solid #EDE8DC', borderRadius: 10, padding: '1rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(201,168,76,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>👤</div>
        <div>
          <div style={{ fontWeight: 600, color: '#1A2744', fontSize: '0.97rem' }}>{user.name}</div>
          <div style={{ fontSize: '0.8rem', color: '#7A7A7A' }}>{user.email}</div>
        </div>
      </div>

      <SectionCard number="1" title="Word Search · Find all 10 hidden words">
        <WordSearch words={WS_WORDS} onProgress={n => setWsFound(n)} />
      </SectionCard>

      <SectionCard number="2" title="Grammar Fill-in · Choose the correct verb form">
        <FillIn onScore={s => setFiScore(s)} />
      </SectionCard>

      <SectionCard number="3" title="Biblical Reflection · Open-ended questions in English">
        <Reflection onChange={setReflections} />
      </SectionCard>

      <SectionCard number="4" title="Final Multiple Choice · All three units">
        <FinalMCQ onScore={s => setMcqScore(s)} />
      </SectionCard>

      {/* Submit */}
      <div className="card" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', fontSize: '1.3rem', marginBottom: '0.5rem' }}>Ready to Submit?</h3>
        <p style={{ color: '#7A7A7A', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
          Your PDF will download automatically and your teacher will receive it via Telegram.
        </p>
        {!submitted ? (
          <button className="btn-gold" onClick={handleSubmit} disabled={submitting} style={{ fontSize: '1rem', padding: '1rem 2.5rem', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? '⏳ Generating PDF...' : '🚀 Submit & Send Results'}
          </button>
        ) : (
          <div style={{ background: 'rgba(39,174,96,0.1)', border: '1px solid #27AE60', borderRadius: 8, padding: '1rem 1.5rem', color: '#1a6e3a', fontWeight: 500 }}>
            ✅ Submitted! Your PDF was downloaded and sent to your teacher.
          </div>
        )}
        {error && (
          <div style={{ background: 'rgba(192,57,43,0.08)', border: '1px solid #C0392B', borderRadius: 8, padding: '0.8rem 1.2rem', color: '#8B1A11', fontWeight: 500, marginTop: '1rem', fontSize: '0.86rem' }}>
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Results Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,20,40,0.75)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ background: '#fff', borderRadius: 16, padding: '3rem', maxWidth: 500, width: '100%', textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏆</div>
            <h2 style={{ fontFamily: 'var(--font-display)', color: '#1A2744', marginBottom: '0.3rem' }}>Workshop Complete!</h2>
            <p style={{ color: '#7A7A7A', fontSize: '0.87rem', marginBottom: '0.5rem' }}>{user.name}</p>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', fontWeight: 900, color: finalPct >= 80 ? '#27AE60' : finalPct >= 60 ? '#C9A84C' : '#C0392B', lineHeight: 1, margin: '0.5rem 0' }}>{finalPct}%</div>
            <div style={{ display: 'inline-block', padding: '0.35rem 1.2rem', borderRadius: 20, background: finalPct >= 80 ? 'rgba(39,174,96,0.12)' : finalPct >= 60 ? 'rgba(201,168,76,0.15)' : 'rgba(192,57,43,0.1)', color: finalPct >= 80 ? '#1a6e3a' : finalPct >= 60 ? '#8B6914' : '#8B1A11', fontWeight: 700, fontSize: '0.88rem', marginBottom: '1rem' }}>{grade}</div>
            <p style={{ color: '#4A4A4A', fontSize: '0.86rem', marginBottom: '1.5rem' }}>
              Your PDF was downloaded and sent to your teacher. Well done for completing the workshop!
            </p>
            <p style={{ color: '#1A2744', fontStyle: 'italic', fontSize: '0.83rem', borderTop: '1px solid #EDE8DC', paddingTop: '1rem', marginBottom: '1.5rem' }}>
              "You intended to harm me, but God intended it for good." — Genesis 50:20
            </p>
            <button className="btn-primary" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
