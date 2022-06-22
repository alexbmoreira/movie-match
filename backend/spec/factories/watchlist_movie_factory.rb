FactoryBot.define do
  factory :watchlist_movie do
    user { create(:user) }
    movie { Faker::Number.number(3) }
  end
end
