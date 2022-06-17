module Api
  module V1
    class FriendRequestsController < ApplicationController
      def show
        respond_with FriendRequests::Find.run!(params),
          serializer: versioned_class(FriendRequestSerializer),
          include: [:creator, :receiver]
      end

      def index
        respond_with FriendRequests::List.run!(params),
          each_serializer: versioned_class(FriendRequestSerializer),
          include: [:creator, :receiver]
      end
    end
  end
end
