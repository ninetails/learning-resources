import { add, concat } from 'ramda'

test('imported add concat', () => {
  expect(add(2, 3)).toEqual(5)
  expect(concat('Hello', ' world')).toEqual('Hello world')
})
