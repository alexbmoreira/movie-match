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
          each_serializer: versioned_class(FriendRequestSerializer),
          include: [:creator, :receiver]
      end

      private

      def find_receiver!
        User.find(friend_request_params[:receiver_id])
      end

      def friend_request_params
        ActiveModelSerializers::Deserialization.jsonapi_parse(params, only: [:receiverId])
      end
    end
  end
end
