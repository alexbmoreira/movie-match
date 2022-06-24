module MatchlistActions
  class Find < ApplicationInteraction
    string :id

    def execute
      policy_scope(Base).find(id)
    end
  end
end
