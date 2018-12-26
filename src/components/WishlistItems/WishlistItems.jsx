import React from 'react';
import { withRouter } from 'react-router-dom';
import ReactTable from 'react-table';
import _ from 'lodash/fp/object';
import PropTypes from 'prop-types';

import 'react-table/react-table.css';
import './ReactTableCustom.css';
import styles from './WishlistItems.module.css';

import Spinner from '../UI/Spinner/Spinner';
import * as TableConfigs from './TableConfigs/TableConfigs';

const WishlistItems = props => {
  const {
    data,
    loading,
    onDeleteItem,
    cart,
    addingToCart,
    addToCartClicked,
  } = props;
  const dataArray = _.values(data);

  const columns = [
    TableConfigs.Remove(onDeleteItem),
    TableConfigs.Thumbnail,
    TableConfigs.Product,
    TableConfigs.Price,
    TableConfigs.AddToCart(
      cart,
      addingToCart,
      addToCartClicked,
      props.history.push
    ),
  ];

  return (
    <div className={styles.Container}>
      <ReactTable
        data={dataArray}
        columns={columns}
        className={styles.ReactTable}
        showPagination={false}
        showPaginationBottom={false}
        showPageSizeOptions={false}
        showPageJump={false}
        collapseOnDataChange={false}
        resizable={false}
        multiSort={false}
        sortable={false}
        defaultPageSize={dataArray.length || 0}
        manual
        LoadingComponent={loading ? Spinner : () => <span />}
        NoDataComponent={() => (
          <h4 style={{ textAlign: 'center' }}>Your wishlist is empty</h4>
        )}
      />
    </div>
  );
};

WishlistItems.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  cart: PropTypes.object,
  addingToCart: PropTypes.object,
  addToCartClicked: PropTypes.func,
};

export default withRouter(WishlistItems);
