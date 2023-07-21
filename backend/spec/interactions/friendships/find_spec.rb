require 'rails_helper'

describe Friendships::Find do
  wrap_user_context { current_user }
  let(:current_user) { user }

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:friend) { create(:user, username: 'sardine') }
  let(:friendship) { create(:friendship, user:, friend:) }
  let(:params) {
    { user_id: }
  }
  let(:user_id) { friendship.friend.id.to_s }

  subject { described_class.run!(params) }

  it { is_expected.to eq(friendship) }

  context 'when searching for a friendship the user did not initiate' do
    let(:current_user) { friend }
    let(:user_id) { friendship.user.id.to_s }

    it { is_expected.to eq(friendship) }
  end

  context 'when searching for a friendship that does not exist for the user' do
    let(:friendship) { create(:friendship) }

    it { is_expected.to eq(nil) }
  end
end
