module Api
  module V1
    class WatchlistMoviesController < ApplicationController
      def show
        respond_with WatchlistMovies::Find.run!(params),
          serializer: versioned_class(WatchlistMovieSerializer),
          include: [:user]
      end

      def index
        respond_with WatchlistMovies::List.run!(params),
          each_serializer: versioned_class(WatchlistMovieSerializer),
          include: [:user]
      end
    end
  end
end
