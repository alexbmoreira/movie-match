require 'rails_helper'

describe Friendships::ListForUser do
  wrap_user_context { user }

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:friend) { create(:user, username: 'sardine') }
  let(:other_user) { create(:user, username: 'eagle') }
  let!(:friendship1) { create(:friendship, user: user, friend: other_user) }
  let!(:friendship2) { create(:friendship) }

  subject { described_class.run!(user:) }

  it { is_expected.to have(1).friendships }
  it { expect(subject).to_not include(friendship2) }
end
