require 'rails_helper'

describe MatchlistActions::Find do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let(:matchlist_action) { create(:matchlist_like, user: user, friend: friend) }
  let(:params) {
    {
      id: matchlist_action.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to eq(matchlist_action) }

  context "when searching for a movie that does not belong to the user's matchlist" do
    let(:matchlist_action) { create(:matchlist_like) }

    it { expect { subject }.to raise_error ActiveRecord::RecordNotFound }
  end

  context 'when finding a dislike' do
    let(:matchlist_action) { create(:matchlist_dislike, user: user, friend: friend) }

    it { is_expected.to eq(matchlist_action) }
  end
end
