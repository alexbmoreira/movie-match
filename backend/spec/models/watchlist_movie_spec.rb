require 'rails_helper'

describe WatchlistMovie do
  let(:params) {
    {
      user: user,
      movie_id: movie_id
    }
  }
  let(:user) { create(:user) }
  let(:movie_id) { 4995 }

  subject { described_class.create(params) }

  it { is_expected.to be_valid }

  context 'when that movie is already in the users watchlist' do
    before { create(:watchlist_movie, user: user, movie_id: movie_id) }

    it { is_expected.to be_invalid }
  end
end
