import { jsPDF } from 'jspdf'
import { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } from '../data/config.js'
import { fillInItems } from '../data/workshop.js'
import { workshopMCQ } from '../data/workshop.js'

const navy = [26, 39, 68]
const gold = [201, 168, 76]
const green = [39, 174, 96]
const red = [192, 57, 43]
const cream = [250, 247, 240]
const white = [255, 255, 255]
const gray = [130, 130, 130]
const W = 210, M = 18

export function generatePDF({ name, email, pct, breakdown, reflections, fiAnswers, mcqAnswers }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  let y = 0

  function newPage() {
    doc.addPage(); y = 20
    doc.setFillColor(...navy); doc.rect(0, 0, W, 12, 'F')
    doc.setFillColor(...gold); doc.rect(0, 12, W, 1.5, 'F')
    doc.setTextColor(...white); doc.setFontSize(7.5); doc.setFont('helvetica', 'normal')
    doc.text('CBF · 9th Grade English · Workshop Results', M, 8)
    doc.text(name, W - M, 8, { align: 'right' })
  }

  function chk(need) { if (y + need > 275) newPage() }

  // ── COVER ──
  doc.setFillColor(...navy); doc.rect(0, 0, W, 85, 'F')
  doc.setFillColor(...gold); doc.rect(0, 85, W, 2, 'F')
  doc.setTextColor(...white); doc.setFontSize(8.5); doc.setFont('helvetica', 'normal')
  doc.text('COLEGIO BOSTON FLEXIBLE · 9TH GRADE RED · 2026', W/2, 18, { align: 'center' })
  doc.setFontSize(24); doc.setFont('helvetica', 'bold')
  doc.text('Workshop Results', W/2, 34, { align: 'center' })
  doc.setFontSize(11); doc.setFont('helvetica', 'normal')
  doc.text('Dreams & Ambitions · The Right Candidate · Describing Trends', W/2, 43, { align: 'center' })
  doc.setFontSize(11); doc.setTextColor(...gold)
  doc.text(name, W/2, 58, { align: 'center' })
  doc.setFontSize(8.5); doc.setTextColor(200, 200, 200)
  doc.text(email, W/2, 65, { align: 'center' })

  // Score circle
  const sc = pct >= 80 ? green : pct >= 60 ? gold : red
  doc.setFillColor(255,255,255); doc.circle(W/2, 106, 19, 'F')
  doc.setFillColor(...sc); doc.circle(W/2, 106, 17, 'F')
  doc.setTextColor(...white); doc.setFontSize(20); doc.setFont('helvetica', 'bold')
  doc.text(pct + '%', W/2, 112, { align: 'center' })
  doc.setFontSize(10); doc.setTextColor(...navy)
  const grade = pct >= 80 ? 'Excellent!' : pct >= 60 ? 'Good work!' : 'Keep going!'
  doc.text(grade, W/2, 132, { align: 'center' })

  // Breakdown boxes
  y = 142
  const boxes = [
    { label: 'WORD SEARCH', val: `${breakdown.wsFound}/${breakdown.wsTotal}` },
    { label: 'FILL-IN', val: `${breakdown.fiCorrect}/${breakdown.fiTotal}` },
    { label: 'FINAL MCQ', val: `${breakdown.mcqCorrect}/${breakdown.mcqTotal}` },
    { label: 'SCORE', val: `${pct}%` },
  ]
  const bw = (W - M*2 - 9) / 4
  boxes.forEach((b, i) => {
    const bx = M + i * (bw + 3)
    doc.setFillColor(...cream); doc.roundedRect(bx, y, bw, 22, 2, 2, 'F')
    doc.setFontSize(6.5); doc.setTextColor(...gray); doc.setFont('helvetica', 'normal')
    doc.text(b.label, bx + bw/2, y + 7, { align: 'center' })
    doc.setFontSize(13); doc.setTextColor(...navy); doc.setFont('helvetica', 'bold')
    doc.text(b.val, bx + bw/2, y + 16, { align: 'center' })
  })

  // Verse footer
  y = 175
  doc.setFillColor(...navy); doc.roundedRect(M, y, W-M*2, 18, 3, 3, 'F')
  doc.setFontSize(7.5); doc.setFont('helvetica', 'italic'); doc.setTextColor(...white)
  doc.text('"You intended to harm me, but God intended it for good." — Genesis 50:20', W/2, y+7, { align:'center', maxWidth: W-M*2-10 })
  doc.setFont('helvetica', 'normal'); doc.setTextColor(...gold)
  doc.text('Unit Verse · Año de la Pureza 2026', W/2, y+13, { align:'center' })

  // ── PAGE 2: FILL-IN ──
  newPage()
  doc.setFillColor(...navy); doc.roundedRect(M, y, W-M*2, 10, 2, 2, 'F')
  doc.setTextColor(...white); doc.setFontSize(9.5); doc.setFont('helvetica', 'bold')
  doc.text('Activity · Grammar Fill-in — Autocorrected', M+5, y+7); y += 16

  fillInItems.forEach((item, idx) => {
    chk(22)
    const chosen = fiAnswers?.[idx]
    const answered = chosen !== undefined
    const isCorrect = chosen === item.correct
    doc.setFillColor(answered ? (isCorrect ? 240 : 255) : 248, answered ? (isCorrect ? 255 : 235) : 248, answered ? (isCorrect ? 240 : 235) : 248)
    doc.roundedRect(M, y, W-M*2, 17, 2, 2, 'F')
    if (answered) {
      doc.setFillColor(...(isCorrect ? green : red)); doc.circle(M+6, y+8.5, 4, 'F')
      doc.setTextColor(...white); doc.setFontSize(8); doc.setFont('helvetica', 'bold')
      doc.text(isCorrect ? '+' : 'x', M+6, y+11, { align: 'center' })
    }
    doc.setTextColor(...navy); doc.setFontSize(8); doc.setFont('helvetica', 'normal')
    doc.text(`${idx+1}. ${item.sentence}`, M+13, y+7, { maxWidth: W-M*2-60 })
    doc.setFontSize(7.5)
    if (answered) {
      doc.setTextColor(...(isCorrect ? green : red)); doc.setFont('helvetica', 'bold')
      doc.text(`Your answer: ${item.opts[chosen]}`, M+13, y+13)
    } else { doc.setTextColor(...gray); doc.text('Not answered', M+13, y+13) }
    if (!isCorrect && answered) { doc.setTextColor(...green); doc.text(`Correct: ${item.opts[item.correct]}`, M+85, y+13) }
    else if (isCorrect) { doc.setTextColor(170,170,170); doc.text('Well done!', M+85, y+13) }
    y += 21
  })

  // ── MCQ ──
  chk(15)
  doc.setFillColor(...navy); doc.roundedRect(M, y, W-M*2, 10, 2, 2, 'F')
  doc.setTextColor(...white); doc.setFontSize(9.5); doc.setFont('helvetica', 'bold')
  doc.text('Activity · Final Multiple Choice — Autocorrected', M+5, y+7); y += 16

  workshopMCQ.forEach((item, idx) => {
    chk(24)
    const chosen = mcqAnswers?.[idx]
    const answered = chosen !== undefined
    const isCorrect = chosen === item.correct
    doc.setFillColor(answered ? (isCorrect ? 240 : 255) : 248, answered ? (isCorrect ? 255 : 235) : 248, answered ? (isCorrect ? 240 : 235) : 248)
    doc.roundedRect(M, y, W-M*2, 19, 2, 2, 'F')
    if (answered) {
      doc.setFillColor(...(isCorrect ? green : red)); doc.circle(M+6, y+9.5, 4, 'F')
      doc.setTextColor(...white); doc.setFontSize(8); doc.setFont('helvetica', 'bold')
      doc.text(isCorrect ? '+' : 'x', M+6, y+12, { align: 'center' })
    }
    doc.setTextColor(...navy); doc.setFontSize(8); doc.setFont('helvetica', 'normal')
    doc.text(`${idx+1}. ${item.q}`, M+13, y+7, { maxWidth: W-M*2-20 })
    doc.setFontSize(7.5)
    if (answered) {
      doc.setTextColor(...(isCorrect ? green : red)); doc.setFont('helvetica', 'bold')
      doc.text(`Your answer: ${item.opts[chosen]}`, M+13, y+14)
    } else { doc.setTextColor(...gray); doc.text('Not answered', M+13, y+14) }
    if (!isCorrect && answered) { doc.setTextColor(...green); doc.text(`Correct: ${item.opts[item.correct]}`, M+90, y+14) }
    y += 23
  })

  // ── REFLECTIONS ──
  chk(15)
  doc.setFillColor(...navy); doc.roundedRect(M, y, W-M*2, 10, 2, 2, 'F')
  doc.setTextColor(...white); doc.setFontSize(9.5); doc.setFont('helvetica', 'bold')
  doc.text('Activity · Biblical Reflections (Open-ended)', M+5, y+7); y += 16

  const refQs = ['Describe a situation where a setback could become a blessing (Gen 50:20).', 'How does "rise to the challenge" connect to Genesis 50:20?', 'How does being made in God\'s image (Gen 1:27-28) motivate you?']
  reflections.forEach((ref, idx) => {
    const lines = doc.splitTextToSize(ref || '(No answer provided)', W-M*2-14)
    const h = Math.max(26, 14 + lines.length * 5)
    chk(h + 4)
    doc.setFillColor(...cream); doc.roundedRect(M, y, W-M*2, h, 2, 2, 'F')
    doc.setFillColor(...gold); doc.roundedRect(M, y, 3, h, 1, 1, 'F')
    doc.setTextColor(...navy); doc.setFontSize(7.5); doc.setFont('helvetica', 'bold')
    doc.text(`${idx+1}. ${refQs[idx]}`, M+7, y+6, { maxWidth: W-M*2-10 })
    doc.setFont('helvetica', 'normal'); doc.setTextColor(...gray); doc.setFontSize(7.5)
    doc.text(lines, M+7, y+13)
    y += h + 4
  })

  doc.setFontSize(7); doc.setTextColor(...gray); doc.setFont('helvetica', 'normal')
  doc.text(`Generated: ${new Date().toLocaleString()} · CBF 9th Grade English · Evolve 4`, W/2, 290, { align: 'center' })

  return doc.output('blob')
}

async function withRetry(fn, retries = 3, delayMs = 2000) {
  let lastError
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (e) {
      lastError = e
      if (i < retries - 1) await new Promise(r => setTimeout(r, delayMs * (i + 1)))
    }
  }
  throw lastError
}

export function sendLoginNotification({ name, email, section }) {
  const now = new Date().toLocaleString('es-CO', { timeZone: 'America/Bogota' })
  const badge = section === 'BLUE' ? '🔵' : '🔴'
  const text = `📋 *Alumno conectado*\n👤 ${name}\n📧 ${email}\n${badge} 9° ${section}\n🕐 ${now}`

  // Fire-and-forget with 3 retries — never blocks login, never crashes the app
  withRetry(() =>
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text, parse_mode: 'Markdown' }),
    }).then(r => r.json()).then(d => { if (!d.ok) throw new Error(d.description) })
  ).catch(() => {/* silent — login still works */})
}

export async function sendToTelegram({ name, email, section, pctDisplay, breakdown, reflections, pdfBlob }) {
  const filename = `CBF_Workshop_${name.replace(/\s+/g, '_')}.pdf`
  const badge = section === 'BLUE' ? '🔵' : '🔴'
  const caption = `📚 *CBF Workshop Entregado*\n👤 ${name}\n📧 ${email}\n${badge} 9° ${section}\n📊 ${pctDisplay}\n• Word Search: ${breakdown.wsFound}/${breakdown.wsTotal}\n• Reading: ${breakdown.rdCorrect ?? 0}/${breakdown.rdTotal ?? 0}\n• Fill-in: ${breakdown.fiCorrect}/${breakdown.fiTotal}\n• MCQ: ${breakdown.mcqCorrect}/${breakdown.mcqTotal}`

  await withRetry(async () => {
    const form = new FormData()
    form.append('chat_id', TELEGRAM_CHAT_ID)
    form.append('document', new Blob([await pdfBlob.arrayBuffer()], { type: 'application/pdf' }), filename)
    form.append('caption', caption)
    form.append('parse_mode', 'Markdown')

    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: form,
    })
    const data = await res.json()
    if (!data.ok) throw new Error(data.description)
  })
  return true
}
