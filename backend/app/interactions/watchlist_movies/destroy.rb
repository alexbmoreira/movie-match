module WatchlistMovies
  class Destroy < ApplicationInteraction
    object :watchlist_movie, class: WatchlistMovie

    def execute
      watchlist_movie.destroy
      watchlist_movie
    end
  end
end
