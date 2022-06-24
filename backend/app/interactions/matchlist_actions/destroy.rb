module MatchlistActions
  class Destroy < ApplicationInteraction
    object :matchlist_action, class: MatchlistActions::Base

    def execute
      matchlist_action.destroy
      matchlist_action
    end
  end
end
