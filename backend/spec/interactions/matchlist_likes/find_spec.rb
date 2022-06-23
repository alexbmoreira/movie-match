require 'rails_helper'

describe MatchlistLikes::Find do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let(:matchlist_like) { create(:matchlist_like, user: user, friend: friend) }
  let(:params) {
    {
      id: matchlist_like.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to eq(matchlist_like) }

  context "when searching for a movie that does not belong to the user's matchlist" do
    let(:matchlist_like) { create(:matchlist_like) }

    it { expect { subject }.to raise_error ActiveRecord::RecordNotFound }
  end
end
