module Search
  class Search < ApplicationInteraction
    string :query
    string :type, default: 'movie'

    validates :type, inclusion: { in: ['movie', 'person'], message: :invalid }

    def execute
      case type
      when 'movie'
        compose(Movie, query:)
      when 'person'
        compose(Person, query:)
      end
    end
  end
end
