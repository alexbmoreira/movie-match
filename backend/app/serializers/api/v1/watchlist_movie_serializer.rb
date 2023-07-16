module Api
  module V1
    class WatchlistMovieSerializer < ApplicationSerializer
      type 'watchlistMovies'

      attributes :created_at,
        :movie

      belongs_to :user, serializer: versioned_class(UserSerializer)
    end
  end
end
