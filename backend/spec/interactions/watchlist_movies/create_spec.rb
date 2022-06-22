require 'rails_helper'

describe WatchlistMovies::Create do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:params) {
    {
      user: user,
      movie_id: '4995'
    }
  }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { WatchlistMovie.count }.by(1) }
end
