import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

import styles from './TableConfigs.module.css';

import Button from '../../UI/Button/Button';
import Icon from '../../UI/Icon/Icon';

export const Product = {
  Header: 'Product',
  headerClassName: styles.Header,
  Cell: row => (
    <div className={styles.Cell}>
      <Link to={`${ROUTES.ITEM}/${row.original.id}`} className={styles.Title}>
        <span>{row.original.title}</span>
      </Link>
    </div>
  ),
  width: 600
};

export const Price = {
  Header: 'Price',
  accessor: 'price',
  Cell: row => (
    <div className={styles.Cell}>
      <span>&pound;{row.value}</span>
    </div>
  ),
  headerClassName: styles.Header,
  width: 170
};

export const AddToCart = (cart, addingToCart, addToCartClicked, redirect) => {
  return {
    Header: '',
    accessor: 'id',
    Cell: row => (
      <div className={styles.Cell}>
        <Button
          theme="white"
          clicked={
            !cart[row.value]
              ? () => addToCartClicked(row.value)
              : () => redirect(ROUTES.CART)
          }
          loading={addingToCart[row.value]}
        >
          {cart[row.value] ? 'view cart' : 'add to cart'}
        </Button>
      </div>
    ),
    headerClassName: styles.Header
  };
};

export const Thumbnail = {
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
};

export const Remove = onDeleteItem => {
  return {
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
  };
};
