module Api
  module V1
    class WatchlistMoviesController < ApplicationController
      def show
        respond_with WatchlistMovies::Find.run!(params),
          serializer: versioned_class(WatchlistMovieSerializer),
          include: [:user]
      end

      def create
        inputs = watchlist_movie_params.merge!(user: @user)
        respond_with WatchlistMovies::Create.run(inputs),
          serializer: versioned_class(WatchlistMovieSerializer),
          include: [:user]
      end

      def destroy
        respond_with WatchlistMovies::Destroy.run(watchlist_movie: find_watchlist_movie!),
          serializer: versioned_class(WatchlistMovieSerializer),
          include: [:user]
      end

      private

      def find_user!
        Users::Find.run!(id: params[:user_id])
      end

      def find_watchlist_movie!
        WatchlistMovies::Find.run!(id: params[:id])
      end

      def watchlist_movie_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:movieId])
      end
    end
  end
end
