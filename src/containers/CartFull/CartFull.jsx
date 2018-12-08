import React, { Component } from 'react';

import { Title, Summary, Items } from '../../components/Cart/Cart';
import ResponsiveWrapper from '../../components/UI/ResponsiveWrapper/ResponsiveWrapper';
import { withFirebase } from '../../components/Firebase/index';
import { CART } from '../../constants/routes';

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

  listenForCart = () => {
    const db = this.props.firebase.db;
    const cartRef = db.collection(CART);

    this.setState({ loading: true });

    this.unsubcribeListener = cartRef.onSnapshot(querySnapshot => {
      const newData = [];
      querySnapshot.forEach(doc => {
        newData.push(doc.data());
      });

      this.setState({
        cart: newData,
        loading: false,
        totalPrice: this.calcTotalPrice(newData)
      });
    });
  };

  deleteItemHandler = id => {
    const db = this.props.firebase.db;
    const cartDocRef = db.collection(CART).doc(id);

    cartDocRef
      .delete()
      .then()
      .catch(e => console.log('something went wrong', e));
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

  render() {
    return (
      <ResponsiveWrapper loading={this.state.loading}>
        <Title>Cart</Title>
        <Items
          data={this.state.cart}
          loading={this.state.loading}
          onDeleteItem={this.deleteItemHandler}
        />
        <Summary
          totalPrice={this.state.totalPrice}
          disableCheckout={!this.state.cart.length}
        />
      </ResponsiveWrapper>
    );
  }
}

export default withFirebase(CartFull);
