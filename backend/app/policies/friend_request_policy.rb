class FriendRequestPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      user.received_friend_requests
    end
  end
end
