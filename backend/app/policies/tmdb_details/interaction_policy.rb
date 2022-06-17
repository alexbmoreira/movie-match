module TmdbDetails
  class InteractionPolicy < ApplicationPolicy
    def movie?
      true
    end

    def person?
      true
    end
  end
end
