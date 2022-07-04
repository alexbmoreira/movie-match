class WatchlistMoviePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      WatchlistMovie.all
    end
  end
end
