module Friendships
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def list?
      true
    end

    def destroy?
      record.friendship.user.id == user.id || record.friendship.friend.id == user.id
    end
  end
end
