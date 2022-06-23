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

      def create
        inputs = matchlist_like_params.merge!(
          user: current_user,
          friend: find_friend!
        )
        respond_with MatchlistLikes::Create.run(inputs),
          serializer: versioned_class(MatchlistLikeSerializer),
          include: [:user, :friend]
      end

      def destroy
        respond_with MatchlistLikes::Destroy.run(matchlist_like: find_matchlist_like!),
          serializer: versioned_class(MatchlistLikeSerializer),
          include: [:user, :friend]
      end

      private

      def find_friend!
        Users::Find.run!(id: matchlist_like_params[:friend_id])
      end

      def find_matchlist_like!
        MatchlistLikes::Find.run!(id: params[:id])
      end

      def matchlist_like_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:friendId, :movieId])
      end
    end
  end
end
