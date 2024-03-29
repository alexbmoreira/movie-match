class User < ApplicationRecord
  has_secure_password

  enum avatar_color: {
    red: 0,
    blue: 1,
    green: 2,
    pink: 3,
    ruby: 4,
    teal: 5,
    viridian: 6,
    saffron: 7,
    marigold: 8,
    pewter: 9,
    champagne: 10,
    blue_violet: 11
  }

  has_many :initiated_friendships,
    class_name: 'Friendship',
    inverse_of: :user,
    dependent: :destroy
  has_many :initiated_friends,
    through: :initiated_friendships,
    source: :friend
  has_many :received_friendships,
    class_name: 'Friendship',
    foreign_key: 'friend_id',
    inverse_of: :friend,
    dependent: :destroy
  has_many :received_friends,
    through: :received_friendships,
    source: :user
  has_many :received_friend_requests,
    class_name: 'FriendRequest',
    foreign_key: 'receiver_id',
    inverse_of: :receiver,
    dependent: :destroy
  has_many :sent_friend_requests,
    class_name: 'FriendRequest',
    foreign_key: 'creator_id',
    inverse_of: :creator,
    dependent: :destroy
  has_many :watchlist_movies, dependent: :destroy

  alias_attribute :watchlist, :watchlist_movies

  validates :password, length: { minimum: 8 }, if: :password
  validates :password, confirmation: true, if: :password
  validates :password_confirmation, presence: true, if: :password

  validates :email, presence: true, uniqueness: true, email: true, format: {
    without: /[^\s]+\s+[^\s]+/
  }
  validates :username, presence: true, uniqueness: true, format: {
    with: /\A(?=.{3,25}$)(?![_.])(?!.*[_.]{3})[a-zA-Z0-9._]+(?<![_.])\z/
  }

  validate :password_requirements, if: :password

  def friends
    initiated_friend_ids = initiated_friends.pluck(:id)
    received_friend_ids = received_friends.pluck(:id)

    friend_ids = received_friend_ids | initiated_friend_ids
    User.where(id: friend_ids)
  end

  def friendships
    initiated_friendships.or(received_friendships)
  end

  def friend_requests
    received_friend_requests.or(sent_friend_requests)
  end

  private

  def password_requirements
    return false if password.nil?

    rules = {
      letter: /[a-zA-Z]+/,
      number: /\d+/
    }

    rules.each_value do |regex|
      next if regex =~ password

      errors.add(:password, 'must have at least one letter and one number')
    end
  end
end

# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  avatar_color    :integer          default("red"), not null
#  email           :string           not null
#  password_digest :string
#  username        :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email     (email) UNIQUE
#  index_users_on_username  (username) UNIQUE
#
