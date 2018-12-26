import React from 'react';

import ReactTable from 'react-table';
import Spinner from '../../UI/Spinner/Spinner';
import * as TableConfigs from './TableConfigs/TableConfigs';

import 'react-table/react-table.css';
import './ReactTableCustom.css';
import styles from './Items.module.css';

export const Items = ({
  data,
  loading,
  onDeleteItem,
  incCounterClicked,
  decCounterClicked,
  onCounterChange,
}) => {
  const dataArray = Object.keys(data).map(e => {
    return data[e];
  });

  const columns = [
    TableConfigs.Product,
    TableConfigs.Price,
    TableConfigs.Quantity(
      incCounterClicked,
      decCounterClicked,
      onCounterChange
    ),
    TableConfigs.Total,
    TableConfigs.Remove(onDeleteItem),
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
        defaultPageSize={data.length || 0}
        manual
        LoadingComponent={loading ? Spinner : () => <span />}
        NoDataComponent={() => <h4>Your cart is empty</h4>}
      />
    </div>
  );
};
