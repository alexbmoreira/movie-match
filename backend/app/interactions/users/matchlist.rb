module Users
  class Matchlist < ApplicationInteraction
    string :id

    def execute
      user = policy_scope(User).find(id)
      return [] if user.blank?

      MatchlistActions::MatchlistLike.where(
        user_id: id, friend_id: current_user.id, movie_id: user_likes
      ).map(&:movie)
    end

    private

    def user_likes
      MatchlistActions::MatchlistLike.where(
        user_id: current_user.id, friend_id: id
      ).pluck(:movie_id)
    end
  end
end
