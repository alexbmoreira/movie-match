module Users
  class Friends < ApplicationInteraction
    string :id

    def execute
      user = policy_scope(User).find(id)
      return [] if user.blank?

      user.friends
    end
  end
end
