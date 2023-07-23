module Searches
  class People < ApplicationInteraction
    string :query

    def execute
      skip_policy_scope

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
