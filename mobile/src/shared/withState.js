import DefaultSpinner from 'components/common/Spinner';
import { makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';

const withState = (Component, State, options={}) => {
  const { customSpinner } = options;
  const Spinner = customSpinner || DefaultSpinner;
  
  /* eslint-disable-next-line react/display-name */
  return observer(class extends React.Component {
    uiState = null;
    isLoaded = false;
    hasError = false;

    constructor() {
      super();
      makeObservable(this, {
        uiState: observable,
        isLoaded: observable,
        hasError: observable
      });
    }
  
    async UNSAFE_componentWillMount() {
      this.uiState = new State();
      if (this.uiState.receiveProps) {
        this.uiState.receiveProps(this.props);
      }
  
      if (this.uiState.load) {
        try {
          await Promise.resolve(this.uiState.load());
        } catch(error) {
          this.hasError = true;
          throw error;
        }
      }
  
      this.isLoaded = true;
    }
  
    componentDidCatch() {
      this.hasError = true;
    }
  
    async componentDidMount() {
      if (this.uiState.mount) {
        this.uiState.mount();
      }
    }
  
    async componentWillUnmount() {
      if (this.uiState.unmount) {
        this.uiState.unmount();
      }
    }
  
    UNSAFE_componentWillReceiveProps(props) {
      if (this.uiState.receiveProps) {
        this.uiState.receiveProps(props);
      }
    }
  
    render() {
      if(!this.isLoaded) return <Spinner/>;

      return <Component {...this.props} uiState={this.uiState}/>;
    }
  });
};

// withState(Component, State, options) wraps Component, instantiates State in
// componentWillMount, and passes it as a prop named uiState into Component.
// if State has a load function, it will be called before Component is mounted.
// Spinner will be rendered while the load promise is being resolved.
// the following lifecycle methods can be defined in State:

// - async load
// - receiveProps(props): will be called immediately after the State is instantiated,
//   and every time Component receives new props
// - mount: will be called after Component is mounted
// - unmount: will be called before Component is unmounted

// options:
// - spinner: Spinner component (defaults to {Spinner} from 'components';)
// - noSpinner: display the component while load is being resolved, instead of a spinner

export default withState;
