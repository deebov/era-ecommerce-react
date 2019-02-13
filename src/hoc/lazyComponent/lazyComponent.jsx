import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';


const lazyComponent = importedComponent => {
  let loadedComponent = null;
  return class Lazy extends Component {
    state = {
      component: loadedComponent,
    };

    static preload() {
      importedComponent().then(cmp => {
        loadedComponent = cmp.default;
      });
    }

    componentDidMount() {
      this.load();
    }

    load() {
      if (!this.state.component) {
        importedComponent().then(cmp => {
          this.setState({ component: cmp.default });
        });
      }
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : <Spinner />;
    }
  };
};

export default lazyComponent;
