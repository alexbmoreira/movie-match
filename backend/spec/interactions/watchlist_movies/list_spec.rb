require 'rails_helper'

describe WatchlistMovies::List do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let!(:watchlist_movie1) { create(:watchlist_movie, user: user) }
  let!(:watchlist_movie2) { create(:watchlist_movie, user: user) }
  let!(:watchlist_movie3) { create(:watchlist_movie) }

  subject { described_class.run! }

  it { is_expected.to have(2).watchlist_movies }
  it { expect(subject).to_not include(watchlist_movie3) }
end
