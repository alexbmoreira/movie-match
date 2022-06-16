module Search
  class Person < ApplicationInteraction
    string :query

    def execute
      results = tmdb_fetch

      results.map do |result|
        TmdbPerson.new(result)
      end
    end

    private

    def tmdb_fetch
      Tmdb::Search.new.resource('person').query(query).fetch
    end
  end
end
