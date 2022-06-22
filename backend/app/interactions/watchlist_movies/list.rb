module WatchlistMovies
  class List < ApplicationInteraction
    def execute
      policy_scope(WatchlistMovie)
    end
  end
end
