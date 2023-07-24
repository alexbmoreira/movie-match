require 'rails_helper'

describe Users::Matchlist do
  wrap_user_context { user }

  # before do
  #   allow(user_matchlist_like1).to receive(:movie).and_return(4995)
  #   allow(user_matchlist_like2).to receive(:movie).and_return(489)
  #   allow(friend_matchlist_like1).to receive(:movie).and_return(4995)
  #   allow(friend_matchlist_like2).to receive(:movie).and_return(68718)
  # end

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:friend) { create(:user, username: 'alligator') }
  let!(:user_matchlist_like1) { create(:matchlist_like, user:, friend:, movie_id: 4995) }
  let!(:user_matchlist_like2) { create(:matchlist_like, user:, friend:, movie_id: 489) }
  let!(:friend_matchlist_like1) { create(:matchlist_like, user: friend, friend: user, movie_id: 4995) } # rubocop:disable Layout/LineLength
  let!(:friend_matchlist_like2) { create(:matchlist_like, user: friend, friend: user, movie_id: 68718) } # rubocop:disable Layout/LineLength

  let(:params) {
    {
      id: friend.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it {
    is_expected.to have(1).movie
    expect(subject.first.id).to eq(user_matchlist_like1.movie_id)
  }
end
