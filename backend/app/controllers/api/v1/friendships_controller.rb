module Api
  module V1
    class FriendshipsController < ApplicationController
      def show
        respond_with Friendships::Find.run!(params),
          serializer: versioned_class(FriendshipSerializer),
          include: [:user, :friend]
      end

      def destroy
        respond_with Friendships::Destroy.run(friendship: find_friendship!),
          serializer: versioned_class(FriendshipSerializer),
          include: [:user, :friend]
      end

      private

      def find_friendship!
        Friendship.find(params[:id])
      end
    end
  end
end
