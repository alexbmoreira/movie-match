require 'rails_helper'

describe Users::Friends do
  wrap_user_context { user }

  let(:user) { create(:user, username: 'hippopotamus') }
  let!(:friendship1) { create(:friendship, user:) }
  let!(:friendship2) { create(:friendship, friend: user) }
  let(:params) {
    {
      id: user.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to include(friendship1.friend, friendship2.user) }
end
