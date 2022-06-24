module MatchlistActions
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def list_likes?
      true
    end

    def list_dislikes?
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
