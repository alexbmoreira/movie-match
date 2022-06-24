module MatchlistActions
  class MatchlistLikePolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        MatchlistActions::MatchlistLike.where(user: user)
      end
    end
  end
end
