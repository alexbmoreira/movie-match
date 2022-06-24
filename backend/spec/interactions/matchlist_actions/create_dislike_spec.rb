require 'rails_helper'

describe MatchlistActions::CreateDislike do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let(:friend) { create(:user, username: 'sardine') }
  let(:params) {
    {
      user: user,
      friend: friend,
      movie_id: '4995'
    }
  }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { MatchlistActions::MatchlistDislike.count }.by(1) }
end
