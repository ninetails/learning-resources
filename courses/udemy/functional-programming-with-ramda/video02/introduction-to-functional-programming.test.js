import { add } from 'ramda'

describe.only('introduction to functional programming', () => {
  test('add with only 1 argument', () => {
    expect(typeof add(2)).toBe('function')
    expect(add(2)(3)).toBe(5)
  })
})
