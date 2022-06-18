module FriendRequests
  class Create < ApplicationInteraction
    object :receiver, class: User

    def execute
      friend_request = FriendRequest.new(
        creator: current_user,
        receiver: receiver
      )

      errors.merge!(friend_request.errors) unless friend_request.save

      friend_request
    end
  end
end
