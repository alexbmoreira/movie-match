class WatchlistMovie < ApplicationRecord
  belongs_to :user

  validates :user, uniqueness: { scope: :movie_id }

  def movie
    @_movie ||= TmdbMovie.new(Tmdb::Movie.detail(movie_id))
  end
end

# == Schema Information
#
# Table name: watchlist_movies
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  movie_id   :integer          not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_watchlist_movies_on_user_id               (user_id)
#  index_watchlist_movies_on_user_id_and_movie_id  (user_id,movie_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
