module Users
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def friends?
      true
    end
  end
end
