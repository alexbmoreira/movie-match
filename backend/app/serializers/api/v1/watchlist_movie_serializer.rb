module Api
  module V1
    class WatchlistMovieSerializer < ApplicationSerializer
      type 'watchlistMovies'

      attributes :created_at,
        :movie

      link(:self) do
        next unless object.id

        methods = []
        methods << 'DELETE' if ::WatchlistMovies::Destroy.can_run?(watchlist_movie: object)

        {
          href: scope.versioned_url_for(:watchlist_movie, object),
          meta: {
            methods: methods
          }
        }
      end

      def movie
        TmdbMovieSerializer.new(object.movie)
      end
    end
  end
end
