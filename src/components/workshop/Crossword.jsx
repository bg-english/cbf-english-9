import { useState, useRef, useCallback } from 'react'
import { CROSSWORD_WORDS, CROSSWORD_ROWS, CROSSWORD_COLS, buildCrosswordGrid } from '../../data/crossword.js'

const GRID = buildCrosswordGrid()
const CELL = 38 // px per cell

// For each word, collect its cells in order
function wordCells(w) {
  const cells = []
  for (let i = 0; i < w.word.length; i++) {
    cells.push({
      r: w.dir === 'across' ? w.row : w.row + i,
      c: w.dir === 'across' ? w.col + i : w.col,
    })
  }
  return cells
}

// Group clues
const acrossClues = CROSSWORD_WORDS.filter(w => w.dir === 'across')
  .sort((a, b) => a.num - b.num || 0)
const downClues = CROSSWORD_WORDS.filter(w => w.dir === 'down')
  .sort((a, b) => a.num - b.num || 0)

export default function Crossword({ onScore }) {
  // inputs[r][c] = single uppercase letter or ''
  const [inputs, setInputs] = useState(() =>
    Array.from({ length: CROSSWORD_ROWS }, () => Array(CROSSWORD_COLS).fill(''))
  )
  // selected: { r, c, dir }
  const [selected, setSelected] = useState(null)
  const [checked, setChecked] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const inputRefs = useRef({})

  const refKey = (r, c) => `${r}-${c}`

  // Determine active word cells
  const activeWordCells = useCallback(() => {
    if (!selected) return new Set()
    const cell = GRID[selected.r][selected.c]
    if (!cell) return new Set()
    const wordNum = selected.dir === 'across' ? cell.across : cell.down
    if (!wordNum) return new Set()
    const wordDef = CROSSWORD_WORDS.find(w => w.num === wordNum && w.dir === selected.dir)
    if (!wordDef) return new Set()
    return new Set(wordCells(wordDef).map(({ r, c }) => refKey(r, c)))
  }, [selected])

  const handleCellClick = (r, c) => {
    const cell = GRID[r][c]
    if (!cell) return
    if (selected && selected.r === r && selected.c === c) {
      // Toggle direction if both exist
      const newDir = selected.dir === 'across' && cell.down ? 'down'
        : selected.dir === 'down' && cell.across ? 'across'
        : selected.dir
      setSelected({ r, c, dir: newDir })
    } else {
      // Pick available direction
      const dir = cell.across ? 'across' : 'down'
      setSelected({ r, c, dir })
    }
    setTimeout(() => inputRefs.current[refKey(r, c)]?.focus(), 0)
  }

  const handleInput = (r, c, val) => {
    const letter = val.replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase()
    const next = inputs.map((row, ri) => row.map((col, ci) => ri === r && ci === c ? letter : col))
    setInputs(next)
    setChecked(false)

    // Advance to next cell in current direction
    if (letter && selected) {
      const dr = selected.dir === 'down' ? 1 : 0
      const dc = selected.dir === 'across' ? 1 : 0
      const nr = r + dr, nc = c + dc
      if (nr < CROSSWORD_ROWS && nc < CROSSWORD_COLS && GRID[nr][nc]) {
        setSelected({ r: nr, c: nc, dir: selected.dir })
        setTimeout(() => inputRefs.current[refKey(nr, nc)]?.focus(), 0)
      }
    }
  }

  const handleKeyDown = (r, c, e) => {
    if (e.key === 'Backspace' && inputs[r][c] === '' && selected) {
      const dr = selected.dir === 'down' ? -1 : 0
      const dc = selected.dir === 'across' ? -1 : 0
      const pr = r + dr, pc = c + dc
      if (pr >= 0 && pc >= 0 && GRID[pr]?.[pc]) {
        setSelected({ r: pr, c: pc, dir: selected.dir })
        setTimeout(() => inputRefs.current[refKey(pr, pc)]?.focus(), 0)
      }
    }
    if (e.key === 'ArrowRight' && GRID[r]?.[c + 1]) {
      setSelected({ r, c: c + 1, dir: 'across' })
      setTimeout(() => inputRefs.current[refKey(r, c + 1)]?.focus(), 0)
    }
    if (e.key === 'ArrowLeft' && GRID[r]?.[c - 1]) {
      setSelected({ r, c: c - 1, dir: 'across' })
      setTimeout(() => inputRefs.current[refKey(r, c - 1)]?.focus(), 0)
    }
    if (e.key === 'ArrowDown' && GRID[r + 1]?.[c]) {
      setSelected({ r: r + 1, c, dir: 'down' })
      setTimeout(() => inputRefs.current[refKey(r + 1, c)]?.focus(), 0)
    }
    if (e.key === 'ArrowUp' && GRID[r - 1]?.[c]) {
      setSelected({ r: r - 1, c, dir: 'down' })
      setTimeout(() => inputRefs.current[refKey(r - 1, c)]?.focus(), 0)
    }
  }

  const checkAnswers = () => {
    setChecked(true)
    // Count correct words
    let correct = 0
    CROSSWORD_WORDS.forEach(w => {
      const cells = wordCells(w)
      const wordCorrect = cells.every(({ r, c }) => inputs[r][c] === w.word[w.dir === 'across' ? c - w.col : r - w.row])
      if (wordCorrect) correct++
    })
    onScore?.({ correct, total: CROSSWORD_WORDS.length })
  }

  const revealAll = () => {
    const next = inputs.map((row, r) => row.map((_, c) => GRID[r][c]?.letter ?? ''))
    setInputs(next)
    setRevealed(true)
    setChecked(true)
  }

  const reset = () => {
    setInputs(Array.from({ length: CROSSWORD_ROWS }, () => Array(CROSSWORD_COLS).fill('')))
    setChecked(false)
    setRevealed(false)
    setSelected(null)
    onScore?.(null)
  }

  const activeCells = activeWordCells()

  const cellState = (r, c) => {
    const cell = GRID[r][c]
    if (!cell) return 'black'
    const key = refKey(r, c)
    const isSelected = selected?.r === r && selected?.c === c
    const isActive = activeCells.has(key)
    const userLetter = inputs[r][c]
    if (checked && userLetter) {
      return userLetter === cell.letter ? 'correct' : 'wrong'
    }
    if (isSelected) return 'selected'
    if (isActive) return 'highlighted'
    return 'empty'
  }

  const stateStyle = {
    black:       { background: '#1A2744', cursor: 'default', border: '1px solid #0d1220' },
    empty:       { background: '#fff', border: '1px solid #C9A84C44', cursor: 'pointer' },
    selected:    { background: '#E8921A', border: '2px solid #C9A84C', cursor: 'text' },
    highlighted: { background: '#FFF5D6', border: '1px solid #C9A84C', cursor: 'pointer' },
    correct:     { background: 'rgba(39,174,96,0.18)', border: '1.5px solid #27AE60' },
    wrong:       { background: 'rgba(192,57,43,0.15)', border: '1.5px solid #C0392B' },
  }

  return (
    <div>
      <style>{`
        .cw-input {
          width: 100%; height: 100%;
          background: transparent; border: none; outline: none;
          text-align: center; font-weight: 700; font-size: 1rem;
          font-family: var(--font-body); text-transform: uppercase;
          color: #1A2744; cursor: inherit; caret-color: transparent;
          padding: 0;
        }
        .cw-input:focus { outline: none; }
      `}</style>

      <div style={{ overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${CROSSWORD_COLS}, ${CELL}px)`,
          gridTemplateRows: `repeat(${CROSSWORD_ROWS}, ${CELL}px)`,
          gap: 2,
          width: 'fit-content',
          margin: '0 auto',
        }}>
          {Array.from({ length: CROSSWORD_ROWS }, (_, r) =>
            Array.from({ length: CROSSWORD_COLS }, (_, c) => {
              const cell = GRID[r][c]
              const state = cellState(r, c)
              const style = stateStyle[state]
              return (
                <div
                  key={refKey(r, c)}
                  onClick={() => cell && handleCellClick(r, c)}
                  style={{
                    width: CELL, height: CELL,
                    position: 'relative',
                    borderRadius: 3,
                    ...style,
                    transition: 'background 0.12s',
                  }}
                >
                  {cell && (
                    <>
                      {cell.clueNum && (
                        <span style={{
                          position: 'absolute', top: 1, left: 2,
                          fontSize: '0.52rem', fontWeight: 700,
                          color: state === 'selected' ? '#fff' : '#CC2936',
                          lineHeight: 1, userSelect: 'none',
                        }}>
                          {cell.clueNum}
                        </span>
                      )}
                      <input
                        ref={el => inputRefs.current[refKey(r, c)] = el}
                        className="cw-input"
                        type="text"
                        inputMode="text"
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="characters"
                        maxLength={2}
                        value={inputs[r][c]}
                        onChange={e => handleInput(r, c, e.target.value)}
                        onKeyDown={e => handleKeyDown(r, c, e)}
                        onFocus={() => !selected || (selected.r !== r || selected.c !== c) ? handleCellClick(r, c) : null}
                        style={{
                          color: state === 'selected' ? '#fff'
                            : state === 'correct' ? '#1a6e3a'
                            : state === 'wrong' ? '#8B1A11'
                            : '#1A2744',
                        }}
                      />
                    </>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.7rem', marginTop: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button className="btn-gold" onClick={checkAnswers} style={{ fontSize: '0.88rem', padding: '0.6rem 1.4rem' }}>
          ✓ Check Answers
        </button>
        <button className="btn-primary" onClick={revealAll} style={{ fontSize: '0.88rem', padding: '0.6rem 1.4rem', opacity: revealed ? 0.5 : 1 }} disabled={revealed}>
          👁 Reveal All
        </button>
        <button onClick={reset} style={{ fontSize: '0.88rem', padding: '0.6rem 1.2rem', background: 'none', border: '1.5px solid #EDE8DC', borderRadius: 8, cursor: 'pointer', color: '#7A7A7A', fontFamily: 'var(--font-body)' }}>
          ↺ Reset
        </button>
      </div>

      {/* Clues */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginTop: '1.5rem' }}>
        {[['Across ➔', acrossClues], ['Down ↓', downClues]].map(([label, clues]) => (
          <div key={label}>
            <p style={{ fontWeight: 700, color: '#CC2936', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>{label}</p>
            {clues.map(w => {
              const isActive = selected && (
                (selected.dir === w.dir && GRID[selected.r]?.[selected.c]?.[w.dir === 'across' ? 'across' : 'down'] === w.num)
              )
              return (
                <div
                  key={`${w.num}-${w.dir}`}
                  onClick={() => {
                    const cells = wordCells(w)
                    const first = cells[0]
                    setSelected({ r: first.r, c: first.c, dir: w.dir })
                    setTimeout(() => inputRefs.current[refKey(first.r, first.c)]?.focus(), 0)
                  }}
                  style={{
                    marginBottom: '0.45rem', cursor: 'pointer',
                    background: isActive ? 'rgba(232,146,26,0.12)' : 'transparent',
                    borderRadius: 6, padding: '0.3rem 0.5rem',
                    borderLeft: isActive ? '3px solid #E8921A' : '3px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontWeight: 700, color: '#1A2744', fontSize: '0.8rem', marginRight: '0.3rem' }}>{w.num}.</span>
                  <span style={{ fontSize: '0.8rem', color: '#4A4A4A' }}>{w.clue}</span>
                  <span style={{ fontSize: '0.7rem', color: '#CC2936', marginLeft: '0.3rem' }}>· U{w.unit}</span>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {checked && !revealed && (
        <div style={{ marginTop: '1rem', background: 'rgba(26,39,68,0.05)', borderRadius: 8, padding: '0.7rem 1rem', fontSize: '0.83rem', color: '#4A4A4A', textAlign: 'center' }}>
          {CROSSWORD_WORDS.every(w => wordCells(w).every(({ r, c }) => inputs[r][c] === w.word[w.dir === 'across' ? c - w.col : r - w.row]))
            ? '🎉 All words correct! Excellent work!'
            : '🔍 Some answers need review. Green = correct, Red = incorrect. Keep trying!'}
        </div>
      )}
    </div>
  )
}
