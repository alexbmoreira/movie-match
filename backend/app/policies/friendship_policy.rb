class FriendshipPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      Friendship.for_user(user)
    end
  end
end
