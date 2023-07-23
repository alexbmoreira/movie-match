module Searches
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

    def user?
      true
    end
  end
end
