module MatchlistActions
  class CreateDislike < ApplicationInteraction
    string :movie_id
    object :user, class: User
    object :friend, class: User

    def execute
      matchlist_dislike = MatchlistActions::MatchlistDislike.new(inputs)

      errors.merge!(matchlist_dislike.errors) unless matchlist_dislike.save

      matchlist_dislike
    end
  end
end
