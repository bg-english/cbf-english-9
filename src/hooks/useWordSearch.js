import { useState, useCallback, useRef } from 'react'

const SIZE = 13
const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function buildGrid(words) {
  const grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(''))
  const placed = []
  const dirs = [[0,1],[1,0],[0,-1],[-1,0],[1,1],[1,-1],[-1,1],[-1,-1]]

  for (const word of words) {
    let success = false
    for (let attempt = 0; attempt < 300 && !success; attempt++) {
      const dir = dirs[Math.floor(Math.random() * dirs.length)]
      const row = Math.floor(Math.random() * SIZE)
      const col = Math.floor(Math.random() * SIZE)
      let fits = true
      for (let i = 0; i < word.length; i++) {
        const r = row + dir[0] * i, c = col + dir[1] * i
        if (r < 0 || r >= SIZE || c < 0 || c >= SIZE) { fits = false; break }
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) { fits = false; break }
      }
      if (fits) {
        const cells = []
        for (let i = 0; i < word.length; i++) {
          const r = row + dir[0] * i, c = col + dir[1] * i
          grid[r][c] = word[i]
          cells.push(`${r}-${c}`)
        }
        placed.push({ word, cells })
        success = true
      }
    }
  }

  for (let r = 0; r < SIZE; r++)
    for (let c = 0; c < SIZE; c++)
      if (grid[r][c] === '') grid[r][c] = LETTERS[Math.floor(Math.random() * 26)]

  return { grid, placed }
}

function getCellsInLine(r1, c1, r2, c2) {
  const dr = r2 - r1, dc = c2 - c1
  const steps = Math.max(Math.abs(dr), Math.abs(dc))
  if (steps === 0) return [`${r1}-${c1}`]
  const isDiag = Math.abs(dr) === Math.abs(dc)
  const isRow = dr === 0
  const isCol = dc === 0
  if (!isDiag && !isRow && !isCol) return [`${r1}-${c1}`]
  const cells = []
  for (let i = 0; i <= steps; i++) {
    const r = r1 + Math.round((dr / steps) * i)
    const c = c1 + Math.round((dc / steps) * i)
    cells.push(`${r}-${c}`)
  }
  return cells
}

export function useWordSearch(words) {
  const [{ grid, placed }] = useState(() => buildGrid(words))
  const [foundWords, setFoundWords] = useState(new Set())
  const [foundCells, setFoundCells] = useState(new Set())
  const [selecting, setSelecting] = useState(false)
  const [highlighted, setHighlighted] = useState(new Set())
  const startCell = useRef(null)

  const tryMatch = useCallback((r1, c1, r2, c2) => {
    const cells = getCellsInLine(r1, c1, r2, c2)
    const word = cells.map(key => {
      const [row, col] = key.split('-').map(Number)
      return grid[row][col]
    }).join('')
    const reversed = word.split('').reverse().join('')
    const match = placed.find(p => p.word === word || p.word === reversed)
    if (match) {
      setFoundWords(fw => {
        if (fw.has(match.word)) return fw
        return new Set([...fw, match.word])
      })
      setFoundCells(fc => new Set([...fc, ...match.cells]))
    }
  }, [grid, placed])

  const onMouseDown = useCallback((r, c) => {
    setSelecting(true)
    startCell.current = { r, c }
    setHighlighted(new Set([`${r}-${c}`]))
  }, [])

  const onMouseEnter = useCallback((r, c) => {
    if (!selecting || !startCell.current) return
    setHighlighted(new Set(getCellsInLine(startCell.current.r, startCell.current.c, r, c)))
  }, [selecting])

  const onMouseUp = useCallback((r, c) => {
    if (!selecting || !startCell.current) return
    tryMatch(startCell.current.r, startCell.current.c, r, c)
    setSelecting(false)
    startCell.current = null
    setHighlighted(new Set())
  }, [selecting, tryMatch])

  const onMouseLeave = useCallback(() => {
    if (selecting) {
      setSelecting(false)
      startCell.current = null
      setHighlighted(new Set())
    }
  }, [selecting])

  // Touch support
  const getTouchCell = useCallback((touch, gridEl) => {
    if (!gridEl) return null
    const rect = gridEl.getBoundingClientRect()
    const x = touch.clientX - rect.left
    const y = touch.clientY - rect.top
    const cellSize = 34 // 32px + 2px gap
    const c = Math.floor(x / cellSize)
    const r = Math.floor(y / cellSize)
    if (r >= 0 && r < SIZE && c >= 0 && c < SIZE) return { r, c }
    return null
  }, [])

  return {
    grid, foundWords, foundCells, highlighted,
    onMouseDown, onMouseEnter, onMouseUp, onMouseLeave,
    getTouchCell, tryMatch,
  }
}
