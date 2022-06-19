FactoryBot.define do
  factory :friend_request do
    creator { create(:user, username: Faker::Cannabis.strain.gsub(/[-\s'#]/, '_')) }
    receiver { create(:user, username: Faker::Games::Minecraft.mob.gsub(/[-\s']/, '_')) }
  end
end
