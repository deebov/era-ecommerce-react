import React from 'react';
import PropTypes from 'prop-types';

import ReactTable from 'react-table';
import Spinner from '../../UI/Spinner/Spinner';
import * as TableConfigs from './TableConfigs/TableConfigs';

import 'react-table/react-table.css';
import './ReactTableCustom.css';
import styles from './Items.module.css';

export const Items = ({
  data,
  loading,
  isRemovingFromCart,
  onDeleteItem,
  incCounterClicked,
  decCounterClicked,
  onCounterChange,
}) => {
  const dataArray = Object.values(data);

  const columns = [
    TableConfigs.Product,
    TableConfigs.Price,
    TableConfigs.Quantity(
      incCounterClicked,
      decCounterClicked,
      onCounterChange
    ),
    TableConfigs.Total,
    TableConfigs.Remove(onDeleteItem, isRemovingFromCart),
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

Items.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.bool,
  onDeleteItem: PropTypes.func,
  incCounterClicked: PropTypes.func,
  decCounterClicked: PropTypes.func,
  onCounterChange: PropTypes.func,
};
