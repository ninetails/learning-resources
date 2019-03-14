import { reverse, adjust, always } from 'ramda'

const a = [1, 2, 3, 4]

test.skip('Javascript is mutable', () => {
  const b = a.reverse()

  console.log(a, b)
  expect(a[0]).toBe(1)
  expect(b[0]).toBe(4)
})

test('Javascript is mutable', () => {
  const b = reverse(a)

  console.log(a, b)
  expect(a[0]).toBe(1)
  expect(b[0]).toBe(4)
})

test.skip('update an array', () => {
  const b = a

  b[0] = 10

  expect(b[0]).toBe(10)
  expect(a[0]).toBe(1)
})

test('update an array', () => {
  const b = adjust(0, always(10), a)

  console.log(a, b)
  expect(b[0]).toBe(10)
  expect(a[0]).toBe(1)
})
