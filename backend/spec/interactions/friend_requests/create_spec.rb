require 'rails_helper'

describe FriendRequests::Create do
  wrap_user_context { creator }

  let(:creator) { create(:user, username: 'hippopotamus') }
  let(:receiver) { create(:user, username: 'sardine') }
  let(:params) { { receiver_id: receiver.id.to_s } }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { FriendRequest.count }.by(1) }
end
