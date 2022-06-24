require 'rails_helper'

describe FriendRequests::List do
  wrap_user_context { creator }

  let(:creator) { create(:user, username: 'hippopotamus') }
  let(:receiver) { create(:user, username: 'sardine') }
  let(:other_user) { create(:user, username: 'eagle') }
  let!(:friend_request1) { create(:friend_request, creator: creator, receiver: other_user) }
  let!(:friend_request2) { create(:friend_request) }

  subject { described_class.run! }

  it { is_expected.to have(1).friend_requests }
  it { expect(subject).to_not include(friend_request2) }
end
