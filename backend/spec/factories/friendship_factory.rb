FactoryBot.define do
  factory :friendship do
    user { create(:user, username: Faker::Cannabis.strain.gsub(/[-\s'#]/, '_')) }
    friend { create(:user, username: Faker::Games::Minecraft.mob.gsub(/[-\s']/, '_')) }
  end
end
