module Users
  class Friends < ApplicationInteraction
    string :id

    def execute
      user = policy_scope(User).find(id)
      return [] unless user.present?

      user.friends
    end
  end
end
