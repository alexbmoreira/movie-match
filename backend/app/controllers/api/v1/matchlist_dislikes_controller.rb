module Api
  module V1
    class MatchlistDislikesController < ApplicationController
      def index
        respond_with MatchlistActions::ListDislikes.run!(params),
          each_serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end

      def create
        inputs = matchlist_dislike_params.merge!(
          user: @user,
          friend: find_friend!
        )
        respond_with MatchlistActions::CreateDislike.run(inputs),
          each_serializer: versioned_class(MatchlistActionSerializer),
          include: [:user, :friend]
      end

      private

      def find_friend!
        Users::Find.run!(id: matchlist_dislike_params[:friend_id])
      end

      def matchlist_dislike_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:friend_id, :movie_id])
      end
    end
  end
end
