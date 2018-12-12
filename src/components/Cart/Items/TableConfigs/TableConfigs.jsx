import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../../constants/routes';
import styles from './TableConfigs.module.css';
import Icon from '../../../UI/Icon/Icon';
import Counter from '../../../UI/Counter/Counter';

export const Product = {
  Header: 'Product',
  accessor: 'product',
  headerClassName: styles.Header,
  Cell: row => (
    <div className={styles.Cell}>
      <div className={styles.ThumbnailBox}>
        <Link to={`${ROUTES.ITEM}/${row.value.id}`}>
          <img
            className={styles.Thumbnail}
            src={row.value.thumbnail}
            alt={row.value.title}
          />
        </Link>
      </div>
      <Link to={`${ROUTES.ITEM}/${row.value.id}`} className={styles.Title}>
        <span>{row.value.title}</span>
      </Link>
    </div>
  ),
  width: 600
};

export const Price = {
  Header: 'Price',
  accessor: 'product.price',
  Cell: row => (
    <div className={styles.Cell}>
      <span>&pound;{row.value}</span>
    </div>
  ),
  headerClassName: styles.Header,
  width: 150
};

export const Quantity = (
  incCounterClicked,
  decCounterClicked,
  onCounterChange
) => {
  return {
    Header: 'Quantity',
    Cell: row => (
      <div className={styles.Counter}>
        <Counter
          value={row.original.amount}
          incClicked={e => incCounterClicked(e, row.original.product.id)}
          decClicked={e => decCounterClicked(e, row.original.product.id)}
          onChange={e => onCounterChange(e, row.original.product.id)}
        />
      </div>
    ),
    headerClassName: styles.Header,
    width: 150
  };
};

export const Total = {
  Header: 'Total',
  accessor: 'total_price',
  Cell: row => (
    <div className={styles.Cell}>
      <span>&pound;{row.value}</span>
    </div>
  ),
  headerClassName: styles.Header,
  width: 150
};

export const Remove = onDeleteItem => {
  return {
    Header: '',
    accessor: 'product.id',
    Cell: row => (
      <div className={[styles.Cell, styles.Cross].join(' ')}>
        <span onClick={() => onDeleteItem(row.value)}>
          <Icon icon="cross" fontSize={22} className={styles.CrossIcon} />
        </span>
      </div>
    ),
    headerClassName: styles.Header,
    width: 70
  };
};
