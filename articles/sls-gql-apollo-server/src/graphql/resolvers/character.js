export default {
  Character: {
    movies: async (source, args, { dataSources }, state) =>
      dataSources.movieSource(source.movies)
  }
}
