require 'rails_helper'

describe WatchlistMovies::ListForUser do
  wrap_user_context { user }

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:other_user) { create(:user, username: 'eagle') }
  let!(:watchlist_movie1) { create(:watchlist_movie, user:) }
  let!(:watchlist_movie2) { create(:watchlist_movie, user: other_user) }

  subject { described_class.run!(user:) }

  it { is_expected.to have(1).watchlist_movies }
  it { expect(subject).to_not include(watchlist_movie2) }

  context 'when searching for another user' do
    subject { described_class.run!(user: other_user) }

    it { is_expected.to have(1).watchlist_movies }
    it { expect(subject).to_not include(watchlist_movie1) }
  end
end
