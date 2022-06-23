module Api
  module V1
    class MatchlistLikesController < ApplicationController
      def show
        respond_with MatchlistLikes::Find.run!(params),
          serializer: versioned_class(MatchlistLikeSerializer),
          include: [:user, :friend]
      end

      def index
        respond_with MatchlistLikes::List.run!(params),
          each_serializer: versioned_class(MatchlistLikeSerializer),
          include: [:user, :friend]
      end
    end
  end
end
