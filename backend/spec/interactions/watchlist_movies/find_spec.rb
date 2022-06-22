require 'rails_helper'

describe WatchlistMovies::Find do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:watchlist_movie) { create(:watchlist_movie, user: user) }
  let(:params) {
    {
      id: watchlist_movie.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to eq(watchlist_movie) }

  context "when searching for a movie that does not belong to the user's watchlist" do
    let(:watchlist_movie) { create(:watchlist_movie) }

    it { expect { subject }.to raise_error ActiveRecord::RecordNotFound }
  end
end
