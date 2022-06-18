FactoryBot.define do
  factory :friendship do
    user { create(:user, username: Faker::Games::Zelda.name.gsub(/[-\s']/, '_')) }
    friend { create(:user, username: Faker::Games::Minecraft.mobs.gsub(/[-\s']/, '_')) }
  end
end
