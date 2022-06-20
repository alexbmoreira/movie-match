module Users
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end
  end
end
