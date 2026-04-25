// Crossword — Units 2 & 3 vocabulary
// Grid: 11 rows × 7 cols
//
// Layout verified:
//   Row  0: BUZZ across       (0,0)→(0,3)
//   Row  2: SPREAD down start (2,0)→(7,0)  |  CATCHY across (2,1)→(2,6)
//   Row  2: CONFIDENT down    (2,1)→(10,1)  (shares C with CATCHY at 2,1)
//   Row  3: POLITE across     (3,0)→(3,5)   (shares P↕ with SPREAD, O↕ with CONFIDENT)
//   Row 10: TRENDY across     (10,1)→(10,6) (shares T↕ with CONFIDENT)

export const CROSSWORD_WORDS = [
  {
    num: 1, dir: 'across', row: 0, col: 0, word: 'BUZZ',
    clue: 'Informal word for excitement or talk about something popular',
    unit: '#3',
  },
  {
    num: 2, dir: 'down', row: 2, col: 0, word: 'SPREAD',
    clue: 'To extend over a large area and reach more and more people',
    unit: '#3',
  },
  {
    num: 3, dir: 'across', row: 2, col: 1, word: 'CATCHY',
    clue: 'Instantly appealing and easy to remember',
    unit: '#3',
  },
  {
    num: 3, dir: 'down', row: 2, col: 1, word: 'CONFIDENT',
    clue: 'Feeling certain about your own abilities; self-assured',
    unit: '#2',
  },
  {
    num: 4, dir: 'across', row: 3, col: 0, word: 'POLITE',
    clue: 'Having good manners and showing respect for others',
    unit: '#2',
  },
  {
    num: 5, dir: 'across', row: 10, col: 1, word: 'TRENDY',
    clue: 'Very fashionable and up-to-date; following the latest trends',
    unit: '#3',
  },
]

export const CROSSWORD_ROWS = 11
export const CROSSWORD_COLS = 7

export function buildCrosswordGrid() {
  const grid = Array.from({ length: CROSSWORD_ROWS }, () =>
    Array(CROSSWORD_COLS).fill(null)
  )

  CROSSWORD_WORDS.forEach(({ row, col, word, dir, num }) => {
    for (let i = 0; i < word.length; i++) {
      const r = dir === 'across' ? row : row + i
      const c = dir === 'across' ? col + i : col
      if (!grid[r][c]) {
        grid[r][c] = { letter: word[i], clueNum: null, across: null, down: null }
      }
      if (i === 0 && !grid[r][c].clueNum) grid[r][c].clueNum = num
      if (dir === 'across') grid[r][c].across = num
      else grid[r][c].down = num
    }
  })

  return grid
}
