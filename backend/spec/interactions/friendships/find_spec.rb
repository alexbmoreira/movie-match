require 'rails_helper'

describe Friendships::Find do
  wrap_user_context { user }

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:friend) { create(:user, username: 'sardine') }
  let(:friendship) { create(:friendship, user: user, friend: friend) }
  let(:params) {
    {
      id: friendship.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to eq(friendship) }

  context 'when searching for a friendship that does not belong to the user' do
    let(:friendship) { create(:friendship) }

    it { expect { subject }.to raise_error ActiveRecord::RecordNotFound }
  end
end
