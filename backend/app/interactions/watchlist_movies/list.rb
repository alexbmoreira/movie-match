module WatchlistMovies
  class List < ApplicationInteraction
    def execute
      policy_scope(WatchlistMovie).for_user(current_user)
    end
  end
end
