require 'rails_helper'

describe Users::Find do
  wrap_user_context

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:params) {
    {
      id: user.id.to_s
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to eq(user) }
end
