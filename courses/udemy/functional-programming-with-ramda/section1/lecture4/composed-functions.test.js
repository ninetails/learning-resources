import { compose, add, __, pipe } from 'ramda'

const addFive = add(__, 5)
const sqr = n => n * n

test('can compose functions', () => {
  const five = compose(addFive, sqr)
  const twentyFive = compose(sqr, addFive)

  expect(five(0)).toBe(5)
  expect(twentyFive(0)).toBe(25)
})

test('can pipe functions', () => {
  const five = pipe(addFive, sqr)
  const twentyFive = pipe(sqr, addFive)

  expect(five(0)).toBe(25)
  expect(twentyFive(0)).toBe(5)
})
