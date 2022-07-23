module WatchlistMovies
  class ListForUser < ApplicationInteraction
    object :user, class: User

    def execute
      policy_scope(WatchlistMovie).where(user: user)
    end
  end
end
