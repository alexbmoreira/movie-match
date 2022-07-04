module WatchlistMovies
  class InteractionPolicy < ApplicationPolicy
    def find?
      true
    end

    def list?
      true
    end

    def create?
      true
    end

    def destroy?
      record.watchlist_movie.user.id == user.id
    end

    def list_for_user?
      true
    end
  end
end
