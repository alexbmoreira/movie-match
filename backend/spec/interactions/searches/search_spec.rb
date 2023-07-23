require 'rails_helper'

describe Searches::Search do
  wrap_user_context

  let(:params) {
    {
      query: query,
      scope: scope
    }
  }
  let(:query) { 'spider-man' }
  let(:scope) { 'movies' }

  subject { described_class.run!(params) }

  before do
    allow_any_instance_of(Searches::Movies).to receive(:run).and_return(nil)
    allow_any_instance_of(Searches::People).to receive(:run).and_return(nil)
    allow_any_instance_of(Searches::Users).to receive(:run).and_return(nil)
  end

  context 'when no query is provided' do
    let(:query) { nil }

    it { is_expected.to eq([]) }
  end

  context 'when the scope is movies' do
    let(:scope) { 'movies' }

    it do
      expect_any_instance_of(Searches::Movies).to receive(:run).and_return(nil)
      subject
    end
  end

  context 'when the scope is people' do
    let(:scope) { 'people' }

    it do
      expect_any_instance_of(Searches::People).to receive(:run)
      subject
    end
  end

  context 'when the scope is users' do
    let(:scope) { 'users' }

    it do
      expect_any_instance_of(Searches::Users).to receive(:run)
      subject
    end
  end
end
