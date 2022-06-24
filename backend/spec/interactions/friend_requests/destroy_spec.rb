require 'rails_helper'

describe FriendRequests::Destroy do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let!(:friend_request) { create(:friend_request, creator: user) }
  let(:params) { { friend_request: } }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { FriendRequest.count }.by(-1) }

  context 'when the user is the receiver' do
    let(:friend_request) { create(:friend_request, receiver: user) }

    it { expect { subject }.to change { FriendRequest.count }.by(-1) }
  end

  context 'when the request does not belong to the user' do
    let(:friend_request) { create(:friend_request) }

    it { expect { subject }.to raise_error Pundit::NotAuthorizedError }
  end
end
