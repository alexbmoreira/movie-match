module MatchlistActions
  class BasePolicy < ApplicationPolicy
    class Scope < Scope
      def resolve
        MatchlistActions::Base.where(user: user)
      end
    end
  end
end
