require 'rails_helper'

describe MatchlistLikes::Destroy do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:matchlist_like) { create(:matchlist_like, user: user, friend: friend) }
  let(:params) {
    {
      matchlist_like: matchlist_like
    }
  }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { MatchlistLike.count }.by(-1) }

  context "when the movie does not belong to the user's matchlist" do
    let(:matchlist_like) { create(:matchlist_like) }

    it { expect { subject }.to raise_error Pundit::NotAuthorizedError }
  end
end
