module Users
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(User).where(id)
    end
  end
end
