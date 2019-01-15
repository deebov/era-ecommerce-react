import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { PrivateRoute } from './PrivateRoute';
import { Route } from 'react-router-dom';
import { Spinner } from '../UI/Spinner/Spinner';

configure({ adapter: new Adapter() });

describe('<PrivateRoute />', () => {
  let props;
  let mountedWrapper;
  const wrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<PrivateRoute {...props} />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    props = {
      isAuthPending: undefined,
      isAuthenticated: undefined,
      component: undefined,
    };
    mountedWrapper = undefined;
  });

  it('renders one `Route` component', () => {
    expect(wrapper().find(Route)).toHaveLength(1);
  });

  // it('gives a function to `Route` as render prop which returns one `Spinner` if `isAuthPending` prop is true', () => {
  //   props.isAuthPending = true;
  //   expect(wrapper().find(Route).props.length).toHaveLength(1);
  // });

  // it('gives a function to `Route` as render prop which returns `component` prop if `isAuthPending` prop is false and `isAuthenticated` prop is true', () => {
  //   props.component = () => <div />;
  //   props.isAuthPending = false;
  //   props.isAuthenticated = true;
  //   expect(wrapper().find(props.component).length).toHaveLength(1);
  // });
});
