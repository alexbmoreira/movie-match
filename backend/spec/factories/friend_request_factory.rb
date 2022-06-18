FactoryBot.define do
  factory :friend_request do
    creator { create(:user, username: Faker::Games::Zelda.name.gsub(/[-\s']/, '_')) }
    receiver { create(:user, username: Faker::Games::Minecraft.mob.gsub(/[-\s']/, '_')) }
  end
end
