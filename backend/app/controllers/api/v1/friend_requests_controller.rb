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
        respond_with FriendRequests::Create.run(receiver: find_receiver!),
          serializer: versioned_class(FriendRequestSerializer),
          include: [:creator, :receiver]
      end

      def destroy
        respond_with FriendRequests::Destroy.run(friend_request: find_friend_request!),
          serializer: versioned_class(FriendRequestSerializer),
          include: [:creator, :receiver]
      end

      private

      def find_friend_request!
        FriendRequests::Find.run!(id: params[:id])
      end

      def find_receiver!
        Users::Find.run!(id: friend_request_params[:receiver_id])
      end

      def friend_request_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:receiverId])
      end
    end
  end
end
