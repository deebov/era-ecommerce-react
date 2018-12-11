import React, { Component } from 'react';

import { Title, Summary, Items } from '../../components/Cart/Cart';
import ResponsiveWrapper from '../../components/UI/ResponsiveWrapper/ResponsiveWrapper';
import { withFirebase } from '../../components/Firebase/index';
import { CART } from '../../constants/routes';
import Notification from '../../components/UI/Notification/Notification';

class CartFull extends Component {
  state = {
    cart: [],
    totalPrice: 0,
    loading: false,
    error: false
  };

  componentDidMount() {
    this.listenForCart();
  }

  componentWillUnmount() {
    this.unsubcribeListener();
  }

  counterHandler = (e, id, type) => {
    const data = [...this.state.cart];
    const oldItemIndex = data.findIndex(e => e.product.id === id);
    const oldItem = data[oldItemIndex];
    const oldCounter = oldItem.amount;
    let updatedCounter = oldCounter;
    let updatedTotalPrice = oldItem.total_price;

    if (type === 'inc') {
      updatedCounter += 1;
      updatedTotalPrice += oldItem.product.price;
    }

    if (type === 'dec') {
      if (updatedCounter > 1) {
        updatedCounter -= 1;
        updatedTotalPrice -= oldItem.product.price;
      }
    }

    if (type === 'change') {
      const val = +e.target.value;
      if (val >= 0) {
        updatedCounter = Math.abs(val);
        updatedTotalPrice = val * oldItem.product.price;
      }
    }

    const updatedItem = {
      ...oldItem,
      amount: updatedCounter,
      total_price: +updatedTotalPrice.toFixed(2)
    };

    data[oldItemIndex] = updatedItem;
    this.setState({
      cart: data,
      totalPrice: this.calcTotalPrice(data)
    });
  };

  listenForCart = () => {
    const db = this.props.firebase.db;
    const cartRef = db.collection(CART);

    this.setState({ loading: true });

    this.unsubcribeListener = cartRef.onSnapshot(
      querySnapshot => {
        const newData = [];
        querySnapshot.forEach(doc => {
          newData.push(doc.data());
        });

        this.setState({
          cart: newData,
          loading: false,
          totalPrice: this.calcTotalPrice(newData)
        });
      },
      e => this.setState({ error: false })
    );
  };

  deleteItemHandler = id => {
    const db = this.props.firebase.db;
    const cartDocRef = db.collection(CART).doc(id);

    cartDocRef
      .delete()
      .then(() => this.props.notify('Item has been deleted'))
      .catch(e => {
        this.props.notify(null, { type: 'fail' });
        console.log('something went wrong', e);
      });
  };

  calcTotalPrice = data => {
    return data.reduce((prev, curr) => {
      return +(prev + curr.total_price).toFixed(2);
    }, 0);
  };

  calcItemsTotalPrice = data => {
    return data.map(e => {
      return { ...e, totalPrice: e.amount * e.product.price };
    });
  };

  errorConfirmedHandler = () => {
    this.setState({ error: false });
  };

  render() {
    return (
      <ResponsiveWrapper loading={this.state.loading}>
        <Title>Cart</Title>
        <Items
          data={this.state.cart}
          loading={this.state.loading}
          onDeleteItem={this.deleteItemHandler}
          incCounterClicked={(e, id) => this.counterHandler(e, id, 'inc')}
          decCounterClicked={(e, id) => this.counterHandler(e, id, 'dec')}
          onCounterChange={(e, id) => this.counterHandler(e, id, 'change')}
        />
        <Summary
          totalPrice={this.state.totalPrice}
          disableCheckout={!this.state.cart.length}
        />
        <Notification
          show={this.state.error}
          options={{ type: 'fail' }}
          onOpen={this.errorConfirmedHandler}
        />
      </ResponsiveWrapper>
    );
  }
}

export default withFirebase(CartFull);
