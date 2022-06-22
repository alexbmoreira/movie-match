FactoryBot.define do
  factory :watchlist_movie do
    user { create(:user) }
    movie_id { Faker::Number.number(digits: 3) }
  end
end
