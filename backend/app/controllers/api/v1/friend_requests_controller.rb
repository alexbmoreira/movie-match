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

      def create
        respond_with FriendRequests::Create.run(friend_request_params),
          serializer: versioned_class(FriendRequestSerializer),
          include: [:creator, :receiver]
      end

      def destroy
        respond_with FriendRequests::Destroy.run(friend_request: find_friend_request!),
          serializer: versioned_class(FriendRequestSerializer),
          include: [:creator, :receiver]
      end

      def accept
        respond_with FriendRequests::Accept.run(friend_request: find_friend_request!),
          serializer: versioned_class(FriendshipSerializer),
          include: [:user, :friend]
      end

      private

      def find_friend_request!
        FriendRequest.find(params[:id])
      end

      def friend_request_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:receiver_id])
      end
    end
  end
end
