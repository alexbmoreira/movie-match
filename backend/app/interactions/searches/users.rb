module Searches
  class Users < ApplicationInteraction
    string :query

    def execute
      policy_scope(::User).where('username ILIKE :query', query: "%#{query}%")
    end
  end
end
