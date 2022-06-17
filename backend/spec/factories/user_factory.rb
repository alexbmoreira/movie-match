FactoryBot.define do
  factory :user do
    username { Faker::Games::Pokemon.name.gsub(/[-\s']/, '_') }
    email { Faker::Internet.email }
    password {
      password = Faker::Internet.password(
        min_length: 10, max_length: 20, mix_case: true, special_characters: true
      )
      "#{password}a1"
    }
    password_confirmation { password }
  end
end
