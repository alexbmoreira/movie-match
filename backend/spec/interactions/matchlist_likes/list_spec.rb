require 'rails_helper'

describe MatchlistLikes::List do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:matchlist_like1) { create(:matchlist_like, user: user, friend: friend) }
  let!(:matchlist_like2) { create(:matchlist_like, user: user, friend: friend) }
  let!(:matchlist_like3) { create(:matchlist_like) }

  subject { described_class.run! }

  it { is_expected.to have(2).matchlist_likes }
  it { expect(subject).to_not include(matchlist_like3) }
end
