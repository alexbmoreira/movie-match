class FriendRequestPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      user.friend_requests
    end
  end
end
