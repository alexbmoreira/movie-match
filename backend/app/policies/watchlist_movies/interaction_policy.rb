module WatchlistMovies
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def list?
      true
    end
  end
end
