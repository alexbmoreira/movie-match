module FriendRequests
  class Create < ApplicationInteraction
    string :receiver_id

    def execute
      friend_request = FriendRequest.new(
        creator: current_user,
        receiver_id: receiver_id
      )

      errors.merge!(friend_request.errors) unless friend_request.save

      friend_request
    end
  end
end
