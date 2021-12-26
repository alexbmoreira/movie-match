import { movieApi } from 'api';
import { makeObservable, observable } from 'mobx';
import TmdbMovie from 'stores/TmdbMovie';

class MovieDetailsState {
  movie = {};

  constructor() {
    makeObservable(this, {
      movie: observable,
    });
  }

  receiveProps({ route }) {
    this.movieId = route.params.movieId;
  }

  async load() {
    const response = await movieApi.getMetadata('movie', this.movieId);
    this.movie = new TmdbMovie(response.data);
  }
}

export default MovieDetailsState;
