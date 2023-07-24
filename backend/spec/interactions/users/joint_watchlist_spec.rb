require 'rails_helper'

describe Users::JointWatchlist do
  wrap_user_context { user }

  # before do
  #   allow(user_watchlist_movie1).to receive(:movie).and_return(4995)
  #   allow(user_watchlist_movie2).to receive(:movie).and_return(489)
  #   allow(friend_watchlist_movie1).to receive(:movie).and_return(4995)
  #   allow(friend_watchlist_movie2).to receive(:movie).and_return(68718)
  # end

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:friend) { create(:user, username: 'alligator') }
  let!(:user_watchlist_movie1) { create(:watchlist_movie, user:, movie_id: 4995) }
  let!(:user_watchlist_movie2) { create(:watchlist_movie, user:, movie_id: 489) }
  let!(:friend_watchlist_movie1) { create(:watchlist_movie, user: friend, movie_id: 4995) }
  let!(:friend_watchlist_movie2) { create(:watchlist_movie, user: friend, movie_id: 68718) }

  let(:params) {
    {
      id: friend.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it {
    is_expected.to have(3).movies
    expect(subject.map(&:id).first).to eq(user_watchlist_movie1.movie_id)
    expect(subject.map(&:id).last(2)).to include(
      user_watchlist_movie2.movie_id, friend_watchlist_movie2.movie_id
    )
    expect(subject.map(&:id).last(2)).to_not include(user_watchlist_movie1.movie_id)
  }

  context 'when the user has actioned a movie' do
    before do
      create(:matchlist_like, user:, movie_id: 489)
    end

    it {
      expect(subject.map(&:id)).to_not include(user_watchlist_movie2.movie_id)
    }
  end
end
