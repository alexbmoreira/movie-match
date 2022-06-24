require 'rails_helper'

describe MatchlistActions::Destroy do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:matchlist_action) { create(:matchlist_like, user:, friend:) }
  let(:params) { { matchlist_action: } }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { MatchlistActions::MatchlistLike.count }.by(-1) }

  context 'when destroying a dislike' do
    let!(:matchlist_action) { create(:matchlist_dislike, user:, friend:) }

    it { expect { subject }.to change { MatchlistActions::MatchlistDislike.count }.by(-1) }
  end

  context "when the movie does not belong to the user's watchlist" do
    let(:matchlist_action) { create(:matchlist_like) }

    it { expect { subject }.to raise_error Pundit::NotAuthorizedError }
  end
end
