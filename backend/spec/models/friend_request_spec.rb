require 'rails_helper'

describe FriendRequest do
  let(:creator) { create(:user, username: 'hippopotamus') }
  let(:receiver) { create(:user, username: 'sardine') }

  let(:params) { { creator:, receiver: } }

  subject { described_class.create(params) }

  it { is_expected.to be_valid }

  context 'when there is already a request with one user' do
    before { create(:friend_request, creator: creator, receiver: create(:user)) }

    it { is_expected.to be_valid }
  end

  context 'when there is already a request between the two users' do
    before { create(:friend_request, creator:, receiver:) }

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

  context 'when request does not have a receiver' do
    let(:receiver) { nil }

    it { is_expected.to be_invalid }
  end
end
