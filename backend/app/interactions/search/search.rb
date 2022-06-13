module Search
  class Search < ApplicationInteraction
    string :query
    string :type, default: 'movie'

    validates :type, inclusion: { in: ['movie'], message: :invalid }

    def execute
      case type
      when 'movie'
        compose(Movie, query: query)
      end
    end
  end
end
