require 'rails_helper'

describe Searches::Users do
  wrap_user_context

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:params) {
    {
      query: 'hippo'
    }
  }

  subject { described_class.run!(params) }

  it { is_expected.to include(user) }
end
