import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from './NotFound';
import Icon from '../UI/Icon/Icon';
import { Link } from 'react-router-dom';
import { LANDING } from '../../constants/routes';

configure({ adapter: new Adapter() });

describe('<NotFound />', () => {
  let props;
  let mountedWrapper;
  const wrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<NotFound {...props} />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    props = {};
    mountedWrapper = undefined;
  });

  describe('<Icon />', () => {
    it('should receive `unlink` as its `icon` prop', () => {
      expect(
        wrapper()
          .find(Icon)
          .prop('icon')
      ).toBe('unlink');
    });
    it('should receive `72` as its `fontSize` prop', () => {
      expect(
        wrapper()
          .find(Icon)
          .prop('fontSize')
      ).toBe('72');
    });
    it('should receive `#f68872` as its `color` prop', () => {
      expect(
        wrapper()
          .find(Icon)
          .prop('color')
      ).toBe('#f68872');
    });
  });

  describe('<Link />', () => {
    it(`should receive ${LANDING} as its \`to\` prop`, () => {
      expect(
        wrapper()
          .find(Link)
          .prop('to')
      ).toBe(LANDING);
    });
    it('should receive `Homepage` as its `title` prop', () => {
      expect(
        wrapper()
          .find(Link)
          .prop('title')
      ).toBe('Homepage');
    });
  });
});
