module Search
  class InteractionPolicy < ApplicationPolicy
    def search?
      true
    end

    def movie?
      true
    end

    def person?
      true
    end
  end
end
