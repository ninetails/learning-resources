import { add } from 'ramda'

const add3 = add(3)

test('Fantasy Land', () => {
  const wrappedVal = [2]
  const wrappedFn = [add3]

  Array.prototype.ap = function (wrappedFn) {
    return wrappedFn.map(fn => fn(this[0]))
  }

  expect(wrappedVal.ap(wrappedFn)).toEqual([5])

  Array.prototype.of = function (val) {
    return new Array(1).fill(val)
  }

  expect([].of(2)).toEqual([2])

  Array.prototype.chain = function (fn) {
    return !this.map(fn)[0] ? this : this.map(fn)
  }

  expect(
    [3]
      .chain(add3)
      .chain(add3)
      .chain(add3)
  ).toEqual([12])

  expect(
    [3]
      .chain(add3)
      .chain(() => undefined)
      .chain(add3)
  ).toEqual([9])

  Array.prototype.just = function () {
    return this[0]
  }

  Array.prototype.nothing = function () {
    return !this[0]
  }

  expect([undefined].nothing()).toBe(true)
  expect([3].just()).toBe(3)
})
