import React, { Component } from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';

const lazyComponent = importedComponent => {
  return class extends Component {
    state = {
      component: null,
    };
    componentDidMount() {
      importedComponent().then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C {...this.props} /> : <Spinner />;
    }
  };
};

export default lazyComponent;
