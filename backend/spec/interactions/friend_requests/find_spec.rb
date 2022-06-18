require 'rails_helper'

describe FriendRequests::Find do
  wrap_user_context { creator }

  let(:creator) { create(:user) }
  let(:receiver) { create(:user) }
  let(:friend_request) { create(:friend_request, creator: creator, receiver: receiver) }
  let(:params) {
    {
      id: friend_request.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to eq(friend_request) }

  context 'when searching for a request that does not belong to the user' do
    let(:friend_request) { create(:friend_request) }

    it { expect { subject }.to raise_error ActiveRecord::RecordNotFound }
  end
end
