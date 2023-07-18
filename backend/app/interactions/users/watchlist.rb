module Users
  class Watchlist < ApplicationInteraction
    string :id

    def execute
      user = policy_scope(User).find(id)
      return [] unless user.present?

      user.watchlist
    end
  end
end
