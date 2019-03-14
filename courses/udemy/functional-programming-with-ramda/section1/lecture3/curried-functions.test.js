import { add, curry, __ } from 'ramda'
import { pbkdf2 } from 'crypto'

// test('2 add 3 is 5', () => {
//   expect(typeof add(2)).toBe('function')
//   expect(add(2)(3)).toBe(5)
//   expect(add(2, 3)).toBe(5)
// })

const keyGen = curry(pbkdf2)
const salt = 'someuniquestringforasalt'
const iterations = 1000
const len = 24
const digest = 'sha512'
const keyGenWithPassword = keyGen('cats12')(salt)(iterations)(len)(digest)
const stored = '178d8575d8c3c5b8e60e5928cb4fb08a945a71a6975e9e84'
const verify = keyGen(__, salt, iterations, len, digest)

test('will hash a password string', done => {
  keyGenWithPassword((err, key) => {
    expect(key instanceof Buffer).toBe(true)
    console.log(key.toString('hex'))
    done()
  })
})

test('should verify a password string', done => {
  verify('cats12')((err, key) => {
    expect(key.toString('hex')).toEqual(stored)
    done()
  })
})
