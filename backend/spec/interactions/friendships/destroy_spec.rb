require 'rails_helper'

describe Friendships::Destroy do
  wrap_user_context { user }

  let(:user) { create(:user) }
  let!(:friendship) { create(:friendship, friend: user) }
  let(:params) {
    {
      friendship: friendship
    }
  }

  subject { described_class.run!(params) }

  it { expect { subject }.to change { Friendship.count }.by(-1) }

  context 'when the user is the friend' do
    let(:friendship) { create(:friendship, friend: user) }

    it { expect { subject }.to change { Friendship.count }.by(-1) }
  end

  context 'when the friendship does not belong to the user' do
    let(:friendship) { create(:friendship) }

    it { expect { subject }.to raise_error Pundit::NotAuthorizedError }
  end
end
