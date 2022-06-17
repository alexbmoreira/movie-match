FactoryBot.define do
  factory :friend_request do
    creator { create(:user) }
    receiver { create(:user) }
  end
end
