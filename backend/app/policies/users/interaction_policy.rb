module Users
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def friends?
      true
    end

    def watchlist?
      true
    end

    def joint_watchlist?
      true
    end

    def matchlist?
      true
    end
  end
end
