import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import ReactTable from 'react-table';
import Icon from '../UI/Icon/Icon';
import * as ROUTES from '../../constants/routes';
import Spinner from '../UI/Spinner/Spinner';
import Button from '../UI/Button/Button';

import 'react-table/react-table.css';
import './ReactTableCustom.css';
import styles from './WishlistItems.module.css';

const WishlistItems = props => {
  const {
    data,
    loading,
    onDeleteItem,
    cart,
    addingToCart,
    addToCartClicked
  } = props;

  const columns = [
    {
      Header: '',
      accessor: 'id',
      Cell: row => (
        <div className={[styles.Cell, styles.Cross].join(' ')}>
          <span onClick={() => onDeleteItem(row.value)}>
            <Icon icon="cross" fontSize={22} className={styles.CrossIcon} />
          </span>
        </div>
      ),
      headerClassName: styles.Header,
      width: 90
    },
    {
      Header: '',
      Cell: row => (
        <div className={styles.Cell}>
          <div className={styles.ThumbnailBox}>
            <Link to={`${ROUTES.ITEM}/${row.original.id}`}>
              <img
                className={styles.Thumbnail}
                src={row.original.thumbnail}
                alt={row.original.title}
              />
            </Link>
          </div>
        </div>
      ),
      width: 125,
      headerClassName: styles.Header
    },
    {
      Header: 'Product',
      headerClassName: styles.Header,
      Cell: row => (
        <div className={styles.Cell}>
          <Link
            to={`${ROUTES.ITEM}/${row.original.id}`}
            className={styles.Title}
          >
            <span>{row.original.title}</span>
          </Link>
        </div>
      ),
      width: 600
    },
    {
      Header: 'Price',
      accessor: 'price',
      Cell: row => (
        <div className={styles.Cell}>
          <span>&pound;{row.value}</span>
        </div>
      ),
      headerClassName: styles.Header,
      width: 170
    },
    {
      Header: '',
      accessor: 'id',
      Cell: row => (
        <div className={styles.Cell}>
          <Button
            theme="white"
            clicked={
              !cart[row.value]
                ? () => addToCartClicked(row.value)
                : () => props.history.push(`${ROUTES.ITEM}/${row.value}`)
            }
            loading={addingToCart[row.value]}
          >
            {cart[row.value] ? 'view cart' : 'add to cart'}
          </Button>
        </div>
      ),
      headerClassName: styles.Header
    }
  ];

  return (
    <div className={styles.Container}>
      <ReactTable
        data={data}
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
        defaultPageSize={data.length || 0}
        manual
        LoadingComponent={loading ? Spinner : () => <span />}
        NoDataComponent={() => (
          <h4 style={{ textAlign: 'center' }}>Your wishlist is empty</h4>
        )}
      />
    </div>
  );
};

export default withRouter(WishlistItems);
