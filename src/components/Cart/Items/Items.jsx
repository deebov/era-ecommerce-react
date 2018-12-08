import React from 'react';
import { Link } from 'react-router-dom';

import ReactTable from 'react-table';
import Counter from '../../UI/Counter/Counter';
import Icon from '../../UI/Icon/Icon';
import * as ROUTES from '../../../constants/routes';
import Spinner from '../../UI/Spinner/Spinner';

import 'react-table/react-table.css';
import './ReactTableCustom.css';
import styles from './Items.module.css';

export const Items = ({ data, loading, onDeleteItem }) => {
  const columns = [
    {
      Header: 'Product',
      accessor: 'product',
      resizable: false,
      headerClassName: styles.Header,
      Cell: row => (
        <div className={styles.Cell}>
          <div className={styles.ThumbnailBox}>
            <Link to={`${ROUTES.ITEM}/${row.value.id}`}>
              <img
                className={styles.Thumbnail}
                src="http://demo3.drfuri.com/supro/wp-content/uploads/sites/3/2018/05/3a.jpg"
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
    },
    {
      Header: 'Price',
      accessor: 'product.price',
      Cell: row => (
        <div className={styles.Cell}>
          <span>&pound;{row.value}</span>
        </div>
      ),
      resizable: false,
      headerClassName: styles.Header,
      width: 150
    },
    {
      Header: 'Quantity',
      accessor: 'amount',
      Cell: row => (
        <div className={styles.Counter}>
          <Counter value={row.value} onChange={() => {}} />
        </div>
      ),
      headerClassName: styles.Header,
      width: 150
    },
    {
      Header: 'Total',
      accessor: 'total_price',
      Cell: row => (
        <div className={styles.Cell}>
          <span>&pound;{row.value}</span>
        </div>
      ),
      headerClassName: styles.Header,
      width: 150
    },
    {
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
    }
  ];

  return (
    <div>
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
        NoDataComponent={() => <h4>Your cart is empty</h4>}
      />
    </div>
  );
};
