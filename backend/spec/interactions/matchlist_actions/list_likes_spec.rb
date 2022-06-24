require 'rails_helper'

describe MatchlistActions::ListLikes do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:matchlist_like1) { create(:matchlist_like, user: user, friend: friend) }
  let!(:matchlist_like2) { create(:matchlist_like) }
  let!(:matchlist_dislike) { create(:matchlist_dislike, user: user, friend: friend) }

  subject { described_class.run! }

  it { is_expected.to have(1).matchlist_likes }
  it { expect(subject).to_not include(matchlist_like2) }
  it { expect(subject).to_not include(matchlist_dislike) }
end
