module MatchlistLikes
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def list?
      true
    end

    def create?
      true
    end

    def destroy?
      record.matchlist_like.user.id == user.id
    end
  end
end
