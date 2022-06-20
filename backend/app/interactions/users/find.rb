module Users
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(User).find(id)
    end
  end
end
