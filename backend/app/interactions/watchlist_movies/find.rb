module WatchlistMovies
  class Find < ApplicationInteraction
    string :movie_id

    def execute
      current_user.watchlist.find_by(movie_id:)
    end
  end
end
