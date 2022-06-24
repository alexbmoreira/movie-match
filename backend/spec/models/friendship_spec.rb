require 'rails_helper'

describe Friendship do
  let(:user) { create(:user, username: 'hippopotamus') }
  let(:friend) { create(:user, username: 'sardine') }

  let(:params) { { user:, friend: } }

  subject { described_class.create(params) }

  it { is_expected.to be_valid }

  context 'when there is already a friendship with one user' do
    before { create(:friendship, user: user, friend: create(:user)) }

    it { is_expected.to be_valid }
  end

  context 'when there is already a friendship between the two users' do
    before { create(:friendship, user:, friend:) }

    it { is_expected.to be_invalid }
  end

  context 'when there is already an inverted friendship between the two users' do
    before { create(:friendship, user: friend, friend: user) }

    it { is_expected.to be_invalid }
  end

  context 'when friendship is with self' do
    let(:friend) { user }

    it { is_expected.to be_invalid }
  end

  context 'when friendship has no friend' do
    let(:friend) { nil }

    it { is_expected.to be_invalid }
  end
end
