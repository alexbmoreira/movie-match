module WatchlistMovies
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(WatchlistMovie).for_user(current_user).find(id)
    end
  end
end
