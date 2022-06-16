module Sessions
  class InteractionPolicy < ApplicationPolicy
    def register?
      true
    end
  end
end
