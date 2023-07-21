module Api
  module V1
    class WatchlistMovieSerializer < ApplicationSerializer
      type 'watchlistMovies'

      attributes :created_at,
        :movie

      def movie
        TmdbMovieSerializer.new(object.movie)
      end
    end
  end
end
