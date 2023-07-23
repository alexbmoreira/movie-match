module Searches
  class Search < ApplicationInteraction
    string :query, default: nil
    string :scope, default: 'movies'

    validates :scope, inclusion: { in: ['movies', 'people', 'users'], message: :invalid }

    def execute
      skip_policy_scope
      return [] if query.blank?

      case scope
      when 'movies'
        compose(Movies, query:)
      when 'people'
        compose(People, query:)
      when 'users'
        compose(Users, query:)
      end
    end
  end
end
