require 'rails_helper'

describe MatchlistActions::LikesWithUser do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:matchlist_like1) { create(:matchlist_like, user:, friend:) }
  let!(:matchlist_like2) { create(:matchlist_like) }
  let!(:matchlist_like3) { create(:matchlist_like, user:) }
  let!(:matchlist_dislike) { create(:matchlist_dislike, user:, friend:) }
  let(:params) {
    {
      user_id: friend.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it do
    is_expected.to have(1).matchlist_likes
    expect(subject).to_not include(matchlist_like2)
    expect(subject).to_not include(matchlist_like3)
    expect(subject).to_not include(matchlist_dislike)
  end
end
