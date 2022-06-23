module MatchlistActions
  class MatchlistDislikePolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        MatchlistActions::MatchlistDislike.where(user: user)
      end
    end
  end
end
