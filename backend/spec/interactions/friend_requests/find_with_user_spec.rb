require 'rails_helper'

describe FriendRequests::FindWithUser do
  wrap_user_context { creator }

  let(:creator) { create(:user, username: 'hippopotamus') }
  let(:receiver) { create(:user, username: 'sardine') }
  let!(:friend_request) { create(:friend_request, creator:, receiver:) }
  let(:params) {
    {
      user: receiver
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to eq(friend_request) }

  context 'when the user is the receiver' do
    let!(:friend_request) { create(:friend_request, creator: receiver, receiver: creator) }

    it { is_expected.to eq(friend_request) }
  end

  context 'when searching for a request that does not belong to the user' do
    let!(:friend_request) { create(:friend_request) }

    it { is_expected.to eq(nil) }
  end
end
