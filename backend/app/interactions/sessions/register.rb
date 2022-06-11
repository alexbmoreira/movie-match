module Sessions
  class Register < ApplicationInteraction
    string :username
    string :email
    string :password
    string :password_confirmation

    def execute
      user = User.new(user_params)

      errors.merge!(user.errors) unless user.save

      user
    end
  end
end
