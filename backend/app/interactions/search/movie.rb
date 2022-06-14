module Search
  class Movie < ApplicationInteraction
    string :query

    def execute
      results = tmdb_fetch

      results.map do |result|
        MovieDb::Movie.new(
          id: result['id'],
          title: result['title'],
          overview: result['overview'],
          release_date: result['release_date'],
          poster_path: result['poster_path']
        )
      end
    end

    private

    def tmdb_fetch
      Tmdb::Search.new.query(query).fetch
    end
  end
end
