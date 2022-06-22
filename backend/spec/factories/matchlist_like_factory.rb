FactoryBot.define do
  factory :matchlist_like do
    user { create(:user, username: Faker::Cannabis.strain.gsub(/[-\s'#]/, '_')) }
    friend { create(:user, username: Faker::Games::Minecraft.mob.gsub(/[-\s']/, '_')) }
    movie_id { Faker::Number.number(digits: 3) }
  end
end
