const { from, pipe } = require('rxjs')
const {
  filter,
  share,
  shareReplay,
  switchMap,
  tap,
  toArray
} = require('rxjs/operators')

function* gen() {
  yield 1
  yield 2
  yield 3
  yield 4
  yield 5
}

const pipeFirst = pipe(
  filter(x => x % 2 !== 0),
  toArray(),
  shareReplay(1)
)

const pipeSecond = pipe(
  filter(x => x % 5 !== 0),
  toArray(),
  shareReplay(1)
)

const pipeThird = pipe(
  filter(x => x !== 1),
  toArray(),
  shareReplay(1)
)

const first$ = pipeFirst(from(gen()))

// const second$ = pipeSecond(first$)

// const third$ = pipeThird(first$)

// second$.subscribe(console.log.bind(console), undefined, () =>
//   console.log('first sub completed')
// )

// second$.subscribe(console.log.bind(console), undefined, () =>
//   console.log('second sub completed')
// )

// third$.subscribe(console.log.bind(console), undefined, () =>
//   console.log('third sub completed')
// )

// first$.subscribe(value => {
//   const second$ = pipeSecond(from(value))
//   second$.subscribe(console.log.bind(console), undefined, () =>
//     console.log('first sub completed')
//   )
// })

const second$ = first$.pipe(switchMap(value => pipeSecond(from(value))))

second$.subscribe(console.log.bind(console), undefined, () =>
  console.log('switchMap 2nd')
)

setTimeout(
  () =>
    second$.subscribe(console.log.bind(console), undefined, () =>
      console.log('switchMap 2nd timeout')
    ),
  2000
)

// first$.subscribe(value => {
//   const third$ = pipeThird(from(value))
//   third$.subscribe(console.log.bind(console), undefined, () =>
//     console.log('third sub completed')
//   )
// })

const third$ = first$.pipe(switchMap(value => pipeThird(from(value))))

third$.subscribe(console.log.bind(console), undefined, () =>
  console.log('switchMap 3rd')
)

setTimeout(
  () =>
    third$.subscribe(console.log.bind(console), undefined, () =>
      console.log('switchMap 3nd timeout')
    ),
  5000
)

console.log('end sync')
