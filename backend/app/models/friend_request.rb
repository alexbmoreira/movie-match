class FriendRequest < ApplicationRecord
  belongs_to :creator, class_name: 'User'
  belongs_to :receiver, class_name: 'User'

  validates :creator, uniqueness: { scope: :receiver }
  validates :creator, comparison: { other_than: :receiver }
  validate :inverse_user_uniqueness

  private

  def inverse_user_uniqueness
    return unless self.class.
                  where(creator_id: receiver_id, receiver_id: creator_id).
                  where.not(id: id).
                  exists?

    errors.add(:base, 'Creator has already been taken')
  end
end

# == Schema Information
#
# Table name: friend_requests
#
#  id          :bigint           not null, primary key
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  creator_id  :bigint           not null
#  receiver_id :bigint           not null
#
# Indexes
#
#  index_friend_requests_on_creator_id                  (creator_id)
#  index_friend_requests_on_creator_id_and_receiver_id  (creator_id,receiver_id) UNIQUE
#  index_friend_requests_on_receiver_id                 (receiver_id)
#
# Foreign Keys
#
#  fk_rails_...  (creator_id => users.id)
#  fk_rails_...  (receiver_id => users.id)
#
