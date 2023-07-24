module Users
  class JointWatchlist < ApplicationInteraction
    string :id

    def execute
      user = policy_scope(User).find(id)
      return [] if user.blank?

      combine_watchlists(
        user.watchlist.order(created_at: :desc),
        current_user.watchlist.order(created_at: :desc)
      )
    end

    private

    def combine_watchlists(list1, list2)
      movies = (list1 + list2).map(&:movie)

      actioned_movies = MatchlistActions::Base.where(user_id: current_user.id).pluck(:movie_id)
      movies = movies.select { !_1.id.in?(actioned_movies) }

      counts = movies.group_by(&:id).transform_values(&:size)

      duplicates = counts.select { |_movie_id, count| count > 1 }.keys
      non_duplicates = counts.select { |_element_id, count| count == 1 }.keys

      shuffled_duplicates = duplicates.shuffle
      shuffled_non_duplicates = non_duplicates.shuffle
      sorted_ids = shuffled_duplicates + shuffled_non_duplicates

      movies.uniq(&:id).sort_by { |movie| sorted_ids.index(movie.id) }
    end
  end
end
