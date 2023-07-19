module Api
  module V1
    class WatchlistMovieSerializer < ApplicationSerializer
      type 'watchlistMovies'

      attributes :created_at,
        :movie
    end
  end
end
