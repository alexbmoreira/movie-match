module MatchlistActions
  class CreateLike < ApplicationInteraction
    string :movie_id
    object :user, class: User
    object :friend, class: User

    def execute
      matchlist_like = MatchlistActions::MatchlistLike.new(inputs)

      errors.merge!(matchlist_like.errors) unless matchlist_like.save

      matchlist_like
    end
  end
end
