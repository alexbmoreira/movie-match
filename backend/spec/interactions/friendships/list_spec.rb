require 'rails_helper'

describe Friendships::List do
  wrap_user_context { user }

  let(:user) { create(:user, username: 'hippopotamus') }
  let(:friend) { create(:user, username: 'sardine') }
  let!(:friendship1) { create(:friendship, user: user) }
  let!(:friendship2) { create(:friendship, friend: user) }
  let!(:friendship3) { create(:friendship, user: user) }
  let!(:friendship4) { create(:friendship) }

  subject { described_class.run! }

  it { is_expected.to have(3).friendships }
  it { expect(subject).to_not include(friendship4) }
end
