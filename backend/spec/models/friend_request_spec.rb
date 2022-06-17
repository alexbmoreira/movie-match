require 'rails_helper'

describe FriendRequest do
  let(:params) {
    {
      creator: creator,
      receiver: receiver
    }
  }
  let(:creator) { create(:user) }
  let(:receiver) { create(:user) }

  subject { described_class.create(params) }

  it { is_expected.to be_valid }

  context 'when there is already a request between with one user' do
    before { create(:friend_request, creator: creator, receiver: create(:user)) }

    it { is_expected.to be_valid }
  end

  context 'when there is already a request between the two users' do
    before { create(:friend_request, creator: creator, receiver: receiver) }

    it { is_expected.to be_invalid }
  end

  context 'when there is already an inverted request between the two users' do
    before { create(:friend_request, creator: receiver, receiver: creator) }

    it { is_expected.to be_invalid }
  end

  context 'when request is to self' do
    let(:receiver) { creator }

    it { is_expected.to be_invalid }
  end
end
