require 'rails_helper'

describe WatchlistMovies::Find do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:watchlist_movie) { create(:watchlist_movie, user:, movie_id: 4995) }
  let(:params) {
    { movie_id: }
  }
  let(:movie_id) { watchlist_movie.movie_id.to_s }

  subject { described_class.run!(params) }

  it { is_expected.to eq(watchlist_movie) }

  context "when searching for a movie that does not belong to the user's watchlist" do
    let(:movie_id) { '489' }

    it { is_expected.to eq(nil) }
  end
end
