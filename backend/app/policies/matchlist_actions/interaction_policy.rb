module MatchlistActions
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def likes_with_user?
      true
    end

    def dislikes_with_user?
      true
    end

    def create_like?
      true
    end

    def create_dislike?
      true
    end

    def destroy?
      record.matchlist_action.user.id == user.id
    end
  end
end
