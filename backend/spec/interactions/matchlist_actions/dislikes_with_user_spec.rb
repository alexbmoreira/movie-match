require 'rails_helper'

describe MatchlistActions::DislikesWithUser do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:matchlist_dislike1) { create(:matchlist_dislike, user:, friend:) }
  let!(:matchlist_dislike2) { create(:matchlist_dislike) }
  let!(:matchlist_dislike3) { create(:matchlist_dislike, user:) }
  let!(:matchlist_like) { create(:matchlist_like, user:, friend:) }
  let(:params) {
    {
      user_id: friend.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it do
    is_expected.to have(1).matchlist_dislikes
    expect(subject).to_not include(matchlist_dislike2)
    expect(subject).to_not include(matchlist_dislike3)
    expect(subject).to_not include(matchlist_like)
  end
end
