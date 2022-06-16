module Search
  class Movie < ApplicationInteraction
    string :query

    def execute
      results = tmdb_fetch

      results.map do |result|
        TmdbMovie.new(result)
      end
    end

    private

    def tmdb_fetch
      Tmdb::Search.new.query(query).fetch
    end
  end
end
