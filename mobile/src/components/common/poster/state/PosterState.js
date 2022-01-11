import { action, makeObservable, observable } from 'mobx';

class PosterState {
  isLoading = true;
  
  constructor() {
    makeObservable(this, {
      isLoading: observable,
      setLoading: action.bound
    });
  }

  setLoading(isLoading) {
    this.isLoading = isLoading;
  }
}

export default PosterState;
