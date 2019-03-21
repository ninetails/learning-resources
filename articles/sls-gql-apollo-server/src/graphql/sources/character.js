import axios from 'axios'

const cache = {}

const extractId = url => {
  const found = url.match(/(\d+)\/$/)

  if (found.length) {
    return found[1]
  }

  return null
}

export default async ids => {
  if (!ids || !ids.length) {
    return []
  }

  const result = []
  const missing = []

  ids.forEach(id =>
    cache[id] ? result.push(cache[id]) : missing.push(id))

  if (missing.length) {
    (await Promise.all(missing.map(id =>
      axios.get(`https://swapi.co/api/people/${id}/`)
        .catch(() => null))))
        .forEach(res => {
          if (!res) {
            return
          }

          const data = res.data
          const id = extractId(data.url)

          if (id) {
            const character = {
              id,
              fullName: data.name,
                movies: data.films.map(filmURL =>
                  extractId(filmURL))
            }

            cache[character.id] = character
            result.push(character)
          }
        })
  }

  return result.filter(x => x)
}
