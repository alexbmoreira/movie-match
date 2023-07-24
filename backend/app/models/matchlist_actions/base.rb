module MatchlistActions
  class Base < ApplicationRecord
    self.table_name = 'matchlist_actions'

    belongs_to :user
    belongs_to :friend, class_name: 'User'

    validate :unique_movie_for_friend

    def movie
      @_movie ||= TmdbMovie.new(Tmdb::Movie.detail(movie_id))
    end

    def self.action
      name.demodulize.underscore
    end

    private

    def unique_movie_for_friend
      return unless MatchlistActions::Base.where(user: user, movie_id: movie_id, friend: friend).
                    where.not(id: id).
                    exists?

      errors.add(:base, 'This movie has already been actioned with this friend')
    end
  end
end

# == Schema Information
#
# Table name: matchlist_actions
#
#  id         :bigint           not null, primary key
#  type       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  friend_id  :bigint           not null
#  movie_id   :integer          not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_matchlist_actions_on_friend_id                           (friend_id)
#  index_matchlist_actions_on_user_id                             (user_id)
#  index_matchlist_actions_on_user_id_and_friend_id_and_movie_id  (user_id,friend_id,movie_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (friend_id => users.id)
#  fk_rails_...  (user_id => users.id)
#
