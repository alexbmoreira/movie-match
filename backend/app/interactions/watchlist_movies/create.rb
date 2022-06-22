module WatchlistMovies
  class Create < ApplicationInteraction
    string :movie_id
    object :user, class: User

    def execute
      watchlist_movie = WatchlistMovie.new(inputs)

      errors.merge!(watchlist_movie.errors) unless watchlist_movie.save

      watchlist_movie
    end
  end
end
