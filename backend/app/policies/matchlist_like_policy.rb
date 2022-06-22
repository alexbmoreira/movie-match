class MatchlistLikePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      MatchlistLike.where(user: user)
    end
  end
end
