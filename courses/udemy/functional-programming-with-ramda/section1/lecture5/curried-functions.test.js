import { curry, pipe, __, always, splitAt, head, last, converge, partialRight, tap } from 'ramda'
import { pbkdf2 } from 'crypto'

const username = 'cat_lover'
const password = 'cats12'
const iterations = 1000
const len = 24
const digest = 'sha512'

test.skip('hashed passwords should match', done => {
  const keyGen = curry(pbkdf2)(password, __, iterations, len, digest)
  const getHash = always('0409757bb520dfc434eb9252b1176082324af3134f71e247someuniquestringtoactasasalt')
  const cb = (err, key, storedKey) => {
    expect(key.toString('hex')).toEqual(storedKey)
    done()
  }
  const match = (storedKey, salt) => {
    return keyGen(salt)(partialRight(cb, [storedKey]))
  }

  const verify = pipe(
    getHash,
    splitAt(len * 2),
    converge(match, [head, last])
  )
  verify(username)
})

test('hashed passwords should match', done => {
  const keyGen = curry(pbkdf2)(password, __, iterations, len, digest)
  const getHash = always('0409757bb520dfc434eb9252b1176082324af3134f71e247someuniquestringtoactasasalt')
  const cb = (err, key, storedKey) => {
    expect(key.toString('hex')).toEqual(storedKey)
    done()
  }
  const match = (storedKey, salt) => {
    return keyGen(salt)(partialRight(cb, [storedKey]))
  }

  const verify = pipe(
    tap(console.log),
    getHash,
    tap(console.log),
    splitAt(len * 2),
    tap(console.log),
    converge(match, [head, last])
  )
  verify(username)
})
