module Searches
  class InteractionPolicy < ApplicationPolicy
    def search?
      true
    end

    def movies?
      true
    end

    def people?
      true
    end

    def users?
      true
    end

    def user?
      true
    end
  end
end
