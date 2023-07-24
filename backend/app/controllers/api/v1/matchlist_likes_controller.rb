module Api
  module V1
    class MatchlistLikesController < ApplicationController
      def create
        inputs = matchlist_like_params.merge!(
          user: @user,
          friend: find_friend!
        )
        respond_with MatchlistActions::CreateLike.run(inputs),
          each_serializer: versioned_class(MatchlistActionSerializer)
      end

      def with_user
        respond_with MatchlistActions::LikesWithUser.run(params),
          each_serializer: versioned_class(MatchlistActionSerializer)
      end

      private

      def find_friend!
        Users::Find.run!(id: matchlist_like_params[:friend_id])
      end

      def matchlist_like_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:friend_id, :movie_id])
      end
    end
  end
end
