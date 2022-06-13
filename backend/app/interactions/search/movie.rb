module Search
  class Movie < ApplicationInteraction
    string :query

    def execute
      results = Tmdb::Search.new.query(query).fetch

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
  end
end
