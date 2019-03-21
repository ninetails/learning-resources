const movies = [
  {
    id: '1',
    title: 'A New Hope',
    characters: [1, 2, 3, 4, 5]
  },
  {
    id: '2',
    title: 'ThemEmpire Strikes Back',
    characters: [1, 2, 3]
  },
  {
    id: '3',
    title: 'Return of the Jedi',
    characters: [30, 31, 45]
  }
]

export default ids =>
  ids === null
    ? movies
    : movies.filter(movie => ids.indexOf(movie.id) >= 0)
