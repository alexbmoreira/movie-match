require 'rails_helper'

describe TmdbMovie do
  subject { described_class.new(params) }

  context 'when creating for details page' do
    let(:params) { JSON.parse(File.read('spec/fixtures/tmdb/movie_details.json')) }

    it do
      is_expected.to have_attributes(
        id: params['id'],
        title: params['title'],
        overview: params['overview'],
        release_date: params['release_date'],
        poster_thumb: include(params['poster_path']),
        poster_path: include(params['poster_path']),
        cast_members: include(a_kind_of(TmdbPerson)),
        crew_members: include(a_kind_of(TmdbPerson))
      )
    end
  end

  context 'when creating for search results' do
    let(:params) { JSON.parse(File.read('spec/fixtures/tmdb/movie_search.json')) }

    it do
      is_expected.to have_attributes(
        id: params['id'],
        title: params['title'],
        release_date: params['release_date'],
        poster_thumb: include(params['poster_path']),
        poster_path: include(params['poster_path'])
      )
    end
  end
end
