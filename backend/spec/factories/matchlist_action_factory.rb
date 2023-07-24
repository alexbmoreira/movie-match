FactoryBot.define do
  factory :matchlist_action, class: MatchlistActions::Base do
    user { create(:user, username: Faker::Cannabis.strain.gsub(/[-\s'#]/, '_')) }
    friend { create(:user, username: Faker::Games::Minecraft.mob.gsub(/[-\s']/, '_')) }
    movie_id { Faker::Number.number(digits: 3) }
  end

  factory :matchlist_like,
    parent: :matchlist_action,
    class: MatchlistActions::MatchlistLike do; end

  factory :matchlist_dislike,
    parent: :matchlist_action,
    class: MatchlistActions::MatchlistDislike do; end
end
