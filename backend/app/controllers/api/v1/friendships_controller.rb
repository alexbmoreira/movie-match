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
    end
  end
end
