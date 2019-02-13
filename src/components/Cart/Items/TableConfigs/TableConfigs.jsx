import React from 'react';

import * as ROUTES from '../../../../constants/routes';
import styles from './TableConfigs.module.css';
import Icon from '../../../UI/Icon/Icon';
import Counter from '../../../UI/Counter/Counter';
import Spinner from '../../../UI/Spinner/Spinner';
import PreloadLinkProduct from '../../../UI/PreloadLink/Product/Product';

const ProductCell = ({ row }) => (
  <div className={styles.Cell}>
    <div className={styles.ThumbnailBox}>
      <PreloadLinkProduct
        to={`${ROUTES.ITEM}/${row.value.id}`}
        id={row.value.id}
        title={row.value.title}
      >
        <img
          className={styles.Thumbnail}
          src={row.value.thumbnail}
          alt={row.value.title}
        />
      </PreloadLinkProduct>
    </div>
    <PreloadLinkProduct
      to={`${ROUTES.ITEM}/${row.value.id}`}
      id={row.value.id}
      title={row.value.title}
      className={styles.Title}
    >
      <span>{row.value.title}</span>
    </PreloadLinkProduct>
  </div>
);

const QuantityCell = ({
  row,
  data: { onCounterChange, incCounterClicked, decCounterClicked },
}) => (
  <div className={styles.Counter}>
    <Counter
      value={row.original.amount}
      incClicked={e => incCounterClicked(e, row.original.id)}
      decClicked={e => decCounterClicked(e, row.original.id)}
      onChange={e => onCounterChange(e, row.original.id)}
    />
  </div>
);

const RemoveCell = ({ row, data: { onDeleteItem, isRemovingFromCart } }) => (
  <div className={[styles.Cell, styles.Cross].join(' ')}>
    {isRemovingFromCart[row.value] ? (
      <span>
        <Spinner type="small" />
      </span>
    ) : (
      <span onClick={() => onDeleteItem(row.value)}>
        <Icon icon="cross" fontSize={22} className={styles.CrossIcon} />
      </span>
    )}
  </div>
);

export const Product = {
  Header: 'Product',
  accessor: 'product',
  headerClassName: styles.Header,
  Cell: row => <ProductCell row={row} />,
  width: 600,
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
  width: 150,
};

export const Quantity = (
  incCounterClicked,
  decCounterClicked,
  onCounterChange
) => {
  return {
    Header: 'Quantity',
    Cell: row => (
      <QuantityCell
        row={row}
        data={{ incCounterClicked, decCounterClicked, onCounterChange }}
      />
    ),
    headerClassName: styles.Header,
    width: 150,
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
  width: 150,
};

export const Remove = (onDeleteItem, isRemovingFromCart) => {
  return {
    Header: '',
    accessor: 'id',
    Cell: row => (
      <RemoveCell row={row} data={{ onDeleteItem, isRemovingFromCart }} />
    ),
    headerClassName: styles.Header,
    width: 70,
  };
};
