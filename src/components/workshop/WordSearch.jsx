import { useEffect } from 'react'
import { useWordSearch } from '../../hooks/useWordSearch.js'

export default function WordSearch({ words, onProgress }) {
  const {
    grid, foundWords, foundCells, highlighted,
    onMouseDown, onMouseEnter, onMouseUp, onMouseLeave
  } = useWordSearch(words)

  useEffect(() => {
    if (onProgress) onProgress(foundWords.size)
  }, [foundWords.size])

  const COLS = grid[0]?.length || 13

  return (
    <div>
      <p style={{ color: '#4A4A4A', fontSize: '0.87rem', marginBottom: '1rem' }}>
        <strong>Click and drag</strong> to select words. They can go in any direction — horizontal, vertical, or diagonal.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: '1.2rem' }}>
        <div
          onMouseLeave={onMouseLeave}
          style={{
            display: 'inline-grid',
            gridTemplateColumns: `repeat(${COLS}, 32px)`,
            gap: 2,
            userSelect: 'none',
            background: '#EDE8DC',
            border: '2px solid #1A2744',
            borderRadius: 10,
            overflow: 'hidden',
            cursor: 'crosshair',
          }}
        >
          {grid.map((row, r) =>
            row.map((letter, c) => {
              const key = `${r}-${c}`
              const isFound = foundCells.has(key)
              const isHighlighted = highlighted.has(key)
              return (
                <div
                  key={key}
                  onMouseDown={() => onMouseDown(r, c)}
                  onMouseEnter={() => onMouseEnter(r, c)}
                  onMouseUp={() => onMouseUp(r, c)}
                  style={{
                    width: 32, height: 32,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.82rem', fontWeight: 700,
                    background: isFound
                      ? 'rgba(39,174,96,0.25)'
                      : isHighlighted
                      ? 'rgba(201,168,76,0.5)'
                      : '#fff',
                    color: isFound ? '#1a6e3a' : '#1A2744',
                    transition: 'background 0.08s',
                    cursor: 'crosshair',
                  }}
                >
                  {letter}
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Word chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.8rem' }}>
        {words.map(w => {
          const found = foundWords.has(w)
          return (
            <span key={w} style={{
              background: found ? 'rgba(39,174,96,0.12)' : '#FAF7F0',
              border: `1px solid ${found ? '#27AE60' : '#EDE8DC'}`,
              borderRadius: 20,
              padding: '0.25rem 0.9rem',
              fontSize: '0.8rem',
              fontWeight: found ? 700 : 400,
              color: found ? '#1a6e3a' : '#9A9A9A',
              textDecoration: found ? 'none' : 'line-through',
              transition: 'all 0.3s',
            }}>
              {found ? '✓ ' : ''}{w}
            </span>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
        <div style={{ background: '#EDE8DC', borderRadius: 20, height: 8, flex: 1 }}>
          <div style={{ height: 8, borderRadius: 20, background: 'linear-gradient(90deg, #8B6914, #C9A84C)', width: `${Math.round((foundWords.size / words.length) * 100)}%`, transition: 'width 0.4s ease' }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#1A2744', fontWeight: 600, whiteSpace: 'nowrap' }}>
          {foundWords.size} / {words.length}
        </span>
      </div>

      {foundWords.size === words.length && (
        <div className="feedback feedback-ok" style={{ marginTop: '0.8rem' }}>
          🎉 Outstanding! You found all {words.length} words!
        </div>
      )}
    </div>
  )
}
