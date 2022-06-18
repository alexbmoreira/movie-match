require 'rails_helper'

describe FriendRequests::Create do
  wrap_user_context { creator }

  let(:creator) { create(:user) }
  let(:receiver) { create(:user) }
  let(:params) {
    {
      receiver: receiver
    }
  }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { FriendRequest.count }.by(1) }

  context 'when creating an invalid request' do
    let(:receiver) { creator }

    it { expect { subject }.to raise_error ActiveInteraction::InvalidInteractionError }
  end
end
