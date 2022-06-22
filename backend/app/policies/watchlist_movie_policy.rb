class WatchlistMoviePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      WatchlistMovie.where(user: user)
    end
  end
end
