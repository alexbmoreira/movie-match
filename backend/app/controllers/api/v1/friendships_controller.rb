module Api
  module V1
    class FriendshipsController < ApplicationController
      def show
        respond_with Friendships::Find.run!(params),
          serializer: versioned_class(FriendshipSerializer),
          include: [:user, :friend]
      end

      def index
        respond_with Friendships::List.run!(params),
          each_serializer: versioned_class(FriendshipSerializer),
          include: [:user, :friend]
      end

      def destroy
        respond_with Friendships::Destroy.run(friendship: find_friendship!),
          serializer: versioned_class(FriendshipSerializer),
          include: [:user, :friend]
      end

      private

      def find_user!
        Users::Find.run!(id: params[:user_id])
      end

      def find_friendship!
        Friendships::Find.run!(id: params[:id])
      end
    end
  end
end
