require 'rails_helper'

describe WatchlistMovie do
  let(:user) { create(:user) }
  let(:movie_id) { 4995 }

  let(:params) { { user:, movie_id: } }

  subject { described_class.create(params) }

  it { is_expected.to be_valid }

  context 'when that movie is already in the users watchlist' do
    before { create(:watchlist_movie, user:, movie_id:) }

    it { is_expected.to be_invalid }
  end
end
