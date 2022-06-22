module Api
  module V1
    class WatchlistMovieSerializer < ApplicationSerializer
      type 'watchlistMovies'

      attributes :created_at,
        :movie_id

      belongs_to :user, serializer: versioned_class(UserDetailSerializer)
    end
  end
end
