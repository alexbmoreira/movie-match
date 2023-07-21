module Searches
  class Search < ApplicationInteraction
    string :query
    string :type, default: 'movie'

    validates :type, inclusion: { in: ['movie', 'person', 'user'], message: :invalid }

    def execute
      skip_policy_scope

      case type
      when 'movie'
        compose(Movie, query:)
      when 'person'
        compose(Person, query:)
      when 'user'
        compose(User, query:)
      end
    end
  end
end
