module Api
  module V1
    class MatchlistLikesController < ApplicationController
      def index
        respond_with MatchlistActions::ListLikes.run!(params),
          each_serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end

      def create
        inputs = matchlist_like_params.merge!(
          user: @user,
          friend: find_friend!
        )
        respond_with MatchlistActions::CreateLike.run(inputs),
          each_serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end

      private

      def find_friend!
        Users::Find.run!(id: matchlist_like_params[:friend_id])
      end

      def matchlist_like_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:friendId, :movieId])
      end
    end
  end
end
