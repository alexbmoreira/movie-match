module WatchlistMovies
  class Find < ApplicationInteraction
    string :id

    def execute
      current_user.watchlist.find_by(movie_id: id)
    end
  end
end
