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
  end
end
