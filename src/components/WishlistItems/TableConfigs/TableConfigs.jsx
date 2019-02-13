import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes';

import styles from './TableConfigs.module.css';

import Button from '../../UI/Button/Button';
import Icon from '../../UI/Icon/Icon';
import Spinner from '../../UI/Spinner/Spinner';
import PreloadLinkProduct from '../../UI/PreloadLink/Product/Product';

const ProductCell = ({ row }) => (
  <div className={styles.Cell}>
    <PreloadLinkProduct
      to={`${ROUTES.ITEM}/${row.original.id}`}
      id={row.original.id}
      title={row.original.title}
      className={styles.Title}
    >
      <span>{row.original.title}</span>
    </PreloadLinkProduct>
  </div>
);

const PriceCell = ({ row }) => (
  <div className={styles.Cell}>
    <span>&pound;{row.value}</span>
  </div>
);

const AddToCartCell = ({
  row,
  data: { addingToCart, addToCartClicked, cart, redirect },
}) => (
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
);

const ThumbnailCell = ({ row }) => (
  <div className={styles.Cell}>
    <div className={styles.ThumbnailBox}>
      <Link to={`${ROUTES.ITEM}/${row.original.id}`} title={row.original.title}>
        <img
          className={styles.Thumbnail}
          src={row.original.thumbnail}
          alt={row.original.title}
        />
      </Link>
    </div>
  </div>
);

const RemoveCell = ({
  row,
  data: { onDeleteItem, isRemovingFromWishlist },
}) => (
  <div className={[styles.Cell, styles.Cross].join(' ')}>
    {isRemovingFromWishlist[row.value] ? (
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
  headerClassName: styles.Header,
  Cell: row => <ProductCell row={row} />,
  width: 600,
};

export const Price = {
  Header: 'Price',
  accessor: 'price',
  Cell: row => <PriceCell row={row} />,
  headerClassName: styles.Header,
  width: 170,
};

export const AddToCart = (cart, addingToCart, addToCartClicked, redirect) => {
  return {
    Header: '',
    accessor: 'id',
    Cell: row => (
      <AddToCartCell
        row={row}
        data={{ cart, addingToCart, addToCartClicked, redirect }}
      />
    ),
    headerClassName: styles.Header,
  };
};

export const Thumbnail = {
  Header: '',
  Cell: row => <ThumbnailCell row={row} />,
  width: 125,
  headerClassName: styles.Header,
};

export const Remove = (onDeleteItem, isRemovingFromWishlist) => {
  return {
    Header: '',
    accessor: 'id',
    Cell: row => (
      <RemoveCell row={row} data={{ onDeleteItem, isRemovingFromWishlist }} />
    ),
    headerClassName: styles.Header,
    width: 90,
  };
};
