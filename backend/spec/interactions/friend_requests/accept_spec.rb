require 'rails_helper'

describe FriendRequests::Accept do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let!(:friend_request) { create(:friend_request, receiver: user) }
  let(:params) {
    {
      friend_request: friend_request
    }
  }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { FriendRequest.count }.by(-1) }
  it { expect { subject }.to change { Friendship.count }.by(1) }

  context 'when the user is the creator' do
    let(:friend_request) { create(:friend_request, creator: user) }

    it { expect { subject }.to raise_error Pundit::NotAuthorizedError }
  end

  context 'when the request does not belong to the user' do
    let(:friend_request) { create(:friend_request) }

    it { expect { subject }.to raise_error Pundit::NotAuthorizedError }
  end
end
