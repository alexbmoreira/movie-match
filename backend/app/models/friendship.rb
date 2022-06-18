class Friendship < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :friend, class_name: 'User'

  validates :user, uniqueness: { scope: :friend }
  validates :user, comparison: { other_than: :friend }
  validate :inverse_user_uniqueness

  scope :for_user, ->(user) { where('user_id = ? OR friend_id = ?', user.id, user.id) }

  private

  def inverse_user_uniqueness
    return unless self.class.
                  where(user_id: friend_id, friend_id: user_id).
                  where.not(id: id).
                  exists?

    errors.add(:base, 'User has already been taken')
  end
end

# == Schema Information
#
# Table name: friendships
#
#  id         :bigint           not null, primary key
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  friend_id  :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_friendships_on_friend_id              (friend_id)
#  index_friendships_on_user_id                (user_id)
#  index_friendships_on_user_id_and_friend_id  (user_id,friend_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (friend_id => users.id)
#  fk_rails_...  (user_id => users.id)
#
