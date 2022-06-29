require 'rails_helper'

describe User do
  let(:username) { 'alexmoreira' }
  let(:email) { 'alexmoreira@gmail.com' }
  let(:password) { "#{Faker::Internet.password(min_length: 10, max_length: 20, mix_case: true, special_characters: true)}a1" } # rubocop:disable Layout/LineLength
  let(:password_confirmation) { password }

  let(:params) { { username:, email:, password:, password_confirmation: } }

  subject { described_class.create(params) }

  it { is_expected.to be_valid }

  context 'when username is invalid' do
    let(:username) { 'alex moreira' }

    it { is_expected.to be_invalid }

    context 'when username starts with special characters' do
      let(:username) { '_alexmoreira' }

      it { is_expected.to be_invalid }
    end

    context 'when username is too short' do
      let(:username) { 'a' }

      it { is_expected.to be_invalid }
    end

    context 'when username has too many consecutive special characters' do
      let(:username) { 'alex_._moreira' }

      it { is_expected.to be_invalid }
    end

    context 'when username contains unapproved special characters' do
      let(:username) { 'alex-moreira' }

      it { is_expected.to be_invalid }
    end
  end

  context 'when email is invalid' do
    let(:email) { 'alex moreira@gmail.com' }

    it { is_expected.to be_invalid }
  end

  context 'when password is invalid' do
    let(:password) { 'abc1' }

    it { is_expected.to be_invalid }
  end

  context 'when password_confirmation does not match password' do
    let(:password_confirmation) { 'abc' }

    it { is_expected.to be_invalid }
  end

  context 'when a username has already been taken' do
    before { create(:user, username:) }

    it { is_expected.to be_invalid }
  end

  context 'when an email has already been taken' do
    before { create(:user, email:) }

    it { is_expected.to be_invalid }
  end
end
