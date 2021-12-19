import { action, makeObservable, observable } from 'mobx';

class PosterState {
  loading = true;
  
  constructor() {
    makeObservable(this, {
      loading: observable,
      setLoading: action.bound
    });
  }

  setLoading(loading) {
    this.loading = loading;
  }
}

export default PosterState;
