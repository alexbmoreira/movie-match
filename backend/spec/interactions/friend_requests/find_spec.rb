require 'rails_helper'

describe FriendRequests::Find do
  wrap_user_context { current_user }
  let(:current_user) { creator }

  let(:creator) { create(:user, username: 'hippopotamus') }
  let(:receiver) { create(:user, username: 'sardine') }
  let(:friend_request) { create(:friend_request, creator:, receiver:) }
  let(:params) {
    { user_id: }
  }
  let(:user_id) { friend_request.receiver.id.to_s }

  subject { described_class.run!(params) }

  it { is_expected.to eq(friend_request) }

  context 'when searching for a request that the user sent' do
    let(:current_user) { receiver }
    let(:user_id) { friend_request.creator.id.to_s }

    it { is_expected.to eq(friend_request) }
  end

  context 'when searching for a request that does not belong to the user' do
    let(:friend_request) { create(:friend_request) }

    it { is_expected.to eq(nil) }
  end
end
