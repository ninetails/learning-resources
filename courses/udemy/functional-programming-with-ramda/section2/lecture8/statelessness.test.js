import { adjust, map, nth, findLastIndex, pipe, tap, isNil, update } from 'ramda'

const Grid = (rows, cols) =>
  new Array(rows).fill(
    new Array(cols).fill(null)
  )

const findEmptyRow = (grid, col) =>
  pipe(
    map(nth(col)),
    findLastIndex(isNil)
  )(grid)

const addCounter = (grid, col, counter) => {
  const row = findEmptyRow(grid, col)
  return adjust(row, update(col, counter), grid)
}

test('Manage state without mutation', () => {
  const grid1 = Grid(3, 3)
  const grid2 = addCounter(grid1, 1, 'O')
  const grid3 = addCounter(grid2, 1, 'X')
  const grid4 = addCounter(grid3, 1, 'O')

  expect(grid1).toEqual([
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ])

  expect(grid4).toEqual([
    [null, 'O', null],
    [null, 'X', null],
    [null, 'O', null]
  ])
})
