module FriendRequests
  class Accept < ApplicationInteraction
    object :friend_request, class: FriendRequest

    def execute
      friendship = Friendship.new(
        user: friend_request.creator,
        friend: @user
      )

      if friendship.save
        friend_request.destroy
      else
        errors.merge!(friendship.errors)
      end

      friendship
    end
  end
end
