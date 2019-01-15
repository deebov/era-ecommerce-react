import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

configure({ adapter: new Adapter() });

describe('<Button  />', () => {
  let props;
  let mountedWrapper;
  const wrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<Button {...props} />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    props = {
      loading: undefined,
      theme: undefined,
      size: undefined,
      className: undefined,
      clicked: undefined,
      disabled: undefined,
      children: undefined,
    };
    mountedWrapper = undefined;
  });

  it('renders its `children` in a `button`', () => {
    props.children = <div unique />;
    expect(
      wrapper()
        .find('button')
        .containsMatchingElement(props.children)
    ).toBe(true);
  });

  it("passes its `className` prop to the `button` element's `className` prop", () => {
    props.className = 'someClass';
    expect(
      wrapper()
        .find('button')
        .prop('className')
    ).toMatch(props.className);
  });

  describe('button receives className', () => {
    beforeEach(() => {
      props.disabled = undefined;
      props.loading = undefined;
      props.size = undefined;
      props.theme = undefined;
    });

    it('receives `ButtonLoading` className if `loading` is true and disabled is false', () => {
      props.disabled = false;
      props.loading = true;

      expect(
        wrapper()
          .find('button')
          .prop('className')
      ).toMatch('ButtonLoading');
    });
    it('receives `ButtonDisabled` className if disabled is true', () => {
      props.disabled = true;

      expect(
        wrapper()
          .find('button')
          .prop('className')
      ).toMatch('ButtonDisabled');
    });
    it('receives `size` prop as its className', () => {
      props.size = 'someSize';

      expect(
        wrapper()
          .find('button')
          .prop('className')
      ).toMatch(props.size);
    });
    it('receives `theme` prop as its className', () => {
      props.theme = 'someTheme';

      expect(
        wrapper()
          .find('button')
          .prop('className')
      ).toMatch(props.theme);
    });
  });
});
