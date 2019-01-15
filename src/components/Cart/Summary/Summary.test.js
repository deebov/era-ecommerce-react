import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Summary } from './Summary';
import Button from '../../UI/Button/Button';

configure({ adapter: new Adapter() });

describe('<Summary />', () => {
  let props;
  let mountedWrapper;
  const wrapper = () => {
    if (!mountedWrapper) {
      mountedWrapper = shallow(<Summary {...props} />);
    }
    return mountedWrapper;
  };

  beforeEach(() => {
    props = {
      checkoutClicked: undefined,
      disableCheckout: undefined,
      totalPrice: undefined,
    };
    mountedWrapper = undefined;
  });

  it('passes its `checkoutClicked` prop to `Button` component as `clicked` prop', () => {
    props.checkoutClicked = jest.fn();
    expect(
      wrapper()
        .find(Button)
        .props().clicked
    ).toBe(props.checkoutClicked);
  });

  it('passes its `disableCheckout` prop to `Button` component as `disabled` prop', () => {
    props.disableCheckout = false;
    expect(
      wrapper()
        .find(Button)
        .props().disabled
    ).toBe(props.disableCheckout);
  });

  it('passes `totalPrice` props to a span as children', () => {
    props.totalPrice = 30;
    expect(
      wrapper()
        .find('span')
        .someWhere(n => n.text().includes(props.totalPrice))
    ).toBe(true);
  });
});
