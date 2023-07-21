module Users
  class Watchlist < ApplicationInteraction
    string :id

    def execute
      user = policy_scope(User).find(id)
      return [] if user.blank?

      user.watchlist.order(created_at: :desc)
    end
  end
end
