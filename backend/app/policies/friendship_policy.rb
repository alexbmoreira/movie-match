class FriendshipPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      Friendship.all
    end
  end
end
