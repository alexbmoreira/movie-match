class FriendRequestPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      FriendRequest.for_user(user)
    end
  end
end
