require 'rails_helper'

describe WatchlistMovies::Destroy do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let!(:watchlist_movie) { create(:watchlist_movie, user:) }
  let(:params) { { watchlist_movie: } }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { WatchlistMovie.count }.by(-1) }

  context "when the movie does not belong to the user's watchlist" do
    let(:watchlist_movie) { create(:watchlist_movie) }

    it { expect { subject }.to raise_error Pundit::NotAuthorizedError }
  end
end
