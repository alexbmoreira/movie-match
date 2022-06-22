require 'rails_helper'

describe MatchlistLike do
  let(:params) {
    {
      user: user,
      friend: friend,
      movie_id: movie_id
    }
  }
  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let(:movie_id) { 4995 }

  subject { described_class.create(params) }

  it { is_expected.to be_valid }

  context 'when the user has liked that movie with another friend' do
    before { create(:matchlist_like, user: user, movie_id: movie_id) }

    it { is_expected.to be_valid }
  end

  context 'when the user has liked that movie with the requested friend' do
    before { create(:matchlist_like, user: user, friend: friend, movie_id: movie_id) }

    it { is_expected.to be_invalid }
  end
end
