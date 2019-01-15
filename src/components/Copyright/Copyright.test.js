import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Copyright from './Copyright';
import Logo from '../UI/Logo/Logo';
import LinkItem from '../UI/LinkItem/LinkItem';

configure({ adapter: new Adapter() });

describe('<Copyright  />', () => {
  let props;
  let mountedWrapper;
  const wrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<Copyright {...props} />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    props = {};
    mountedWrapper = undefined;
  });

  it('renders one `<Logo /> component', () => {
    expect(wrapper().find(Logo)).toHaveLength(1);
  });

  it("sets `Logo`'s height prop to `15px`", () => {
    expect(wrapper().find(Logo).prop('height')).toBe('15px');
  });

  it('renders two <LinkItem />', () => {
    expect(wrapper().find(LinkItem)).toHaveLength(2);
  });
});
