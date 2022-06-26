class User < ApplicationRecord
  authenticates_with_sorcery!

  validates :password, length: { minimum: 8 }, if: -> { password_update }
  validates :password, confirmation: true, if: -> { password_update }
  validates :password_confirmation, presence: true, if: -> { password_update }

  validates :email, presence: true, uniqueness: true, email: true, format: {
    without: /[^\s]+\s+[^\s]+/
  }
  validates :username, presence: true, uniqueness: true, format: {
    with: /\A(?=.{3,25}$)(?![_.])(?!.*[_.]{3})[a-zA-Z0-9._]+(?<![_.])\z/
  }

  validate :password_requirements, if: -> { password_update }

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

  def password_update
    new_record? || will_save_change_to_crypted_password?
  end
end

# == Schema Information
#
# Table name: users
#
#  id                                  :bigint           not null, primary key
#  access_count_to_reset_password_page :integer          default(0)
#  crypted_password                    :string
#  email                               :string           not null
#  last_activity_at                    :datetime
#  last_login_at                       :datetime
#  last_login_from_ip_address          :string
#  last_logout_at                      :datetime
#  reset_password_email_sent_at        :datetime
#  reset_password_token                :string
#  reset_password_token_expires_at     :datetime
#  salt                                :string
#  username                            :string           not null
#  created_at                          :datetime         not null
#  updated_at                          :datetime         not null
#
# Indexes
#
#  index_users_on_email                                (email) UNIQUE
#  index_users_on_last_logout_at_and_last_activity_at  (last_logout_at,last_activity_at)
#  index_users_on_reset_password_token                 (reset_password_token)
#  index_users_on_username                             (username) UNIQUE
#
