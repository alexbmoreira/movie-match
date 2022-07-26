require 'rails_helper'

describe Friendships::FindWithUser do
  wrap_user_context { user }

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:friendship) { create(:friendship, user:, friend:) }
  let(:params) {
    {
      user: friend
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to eq(friendship) }

  context 'when searching for a friendship that does not belong to the user' do
    let!(:friendship) { create(:friendship) }

    it { is_expected.to eq(nil) }
  end
end
