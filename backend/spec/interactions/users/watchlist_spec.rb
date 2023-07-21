require 'rails_helper'

describe Users::Watchlist do
  wrap_user_context { user }

  let(:user) { create(:user, username: 'hippopotamus') }
  let!(:watchlist_movie1) { create(:watchlist_movie, user:, movie_id: 4995) }
  let!(:watchlist_movie2) { create(:watchlist_movie, user:, movie_id: 489) }
  let(:params) {
    {
      id: user.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to include(watchlist_movie1, watchlist_movie2) }
end
