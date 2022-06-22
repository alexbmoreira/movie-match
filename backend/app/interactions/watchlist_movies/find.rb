module WatchlistMovies
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(WatchlistMovie).find(id)
    end
  end
end
