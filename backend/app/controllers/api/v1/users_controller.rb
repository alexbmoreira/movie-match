module Api
  module V1
    class UsersController < ApplicationController
      def show
        respond_with Users::Find.run!(params),
          serializer: versioned_class(UserDetailSerializer)
      end

      def friends
        respond_with Users::Friends.run!(params),
          each_serializer: versioned_class(UserDetailSerializer)
      end

      def watchlist
        respond_with Users::Watchlist.run!(params),
          each_serializer: versioned_class(WatchlistMovieSerializer)
      end

      def joint_watchlist
        respond_with Users::JointWatchlist.run!(params),
          each_serializer: versioned_class(TmdbMovieSerializer)
      end
    end
  end
end
