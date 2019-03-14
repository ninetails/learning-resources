import { pipe, tap, pick, evolve, map, prop, props, zip, join } from 'ramda'

const data = {
  coord: {
    lon: -0.13, lat: 51.51
  },
  weather: [
    {
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d'
    }
  ],
  base: 'stations',
  main: {
    temp: 285.06,
    pressure: 1014,
    humidity: 76,
    temp_min: 284.15,
    temp_max: 286.15
  },
  visibility: 10000,
  wind: {
    speed: 9.3,
    deg: 240,
    gust: 15.4
  },
  clouds: {
    all: 75
  },
  dt: 1511178600,
  sys: {
    type: 1,
    id: 5091,
    message: 0.0087,
    country: 'GB',
    sunrise: 1511162879,
    sunset: 1511193846
  },
  id: 2643743,
  name: 'London',
  cod: 200
}

test.only('point free style', () => {
  // const summarySentence = data => `Today in ${data.name} you can expect ${data.weather[0].description}`
  const transformWeather = {
    weather: pipe(
      map(prop('description')),
      join(' ')
    )
  }
  const summarySentence = pipe(
    pick(['name', 'weather']),
    evolve(transformWeather),
    props(['name', 'weather']),
    zip(['Today in', 'you can expect']),
    map(join(' ')),
    join(' ')
  )
  expect(summarySentence(data))
    .toEqual('Today in London you can expect broken clouds')
})
