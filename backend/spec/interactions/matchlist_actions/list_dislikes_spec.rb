require 'rails_helper'

describe MatchlistActions::ListDislikes do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:matchlist_dislike1) { create(:matchlist_dislike, user:, friend:) }
  let!(:matchlist_dislike2) { create(:matchlist_dislike) }
  let!(:matchlist_like) { create(:matchlist_like, user:, friend:) }

  subject { described_class.run! }

  it { is_expected.to have(1).matchlist_dislikes }
  it { expect(subject).to_not include(matchlist_dislike2) }
  it { expect(subject).to_not include(matchlist_like) }
end
