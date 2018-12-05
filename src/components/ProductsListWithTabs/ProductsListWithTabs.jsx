import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ProductsList from '../../containers/ProductsList/ProductsList';
import styles from './ProductsListWithTabs.module.css';

const ProductsListWithTabs = ({ lists }) => {
  const tabs = lists.map((l, i) => (
    <Tab key={i} className={styles.Tab} selectedClassName={styles.TabActive}>
      {l.title}
    </Tab>
  ));
  const tabPanels = lists.map((l, i) => (
    <TabPanel key={i}>
      <ProductsList id={l.id} />
    </TabPanel>
  ));

  return (
    <div>
      <Tabs>
        <TabList className={styles.TabList}>{tabs}</TabList>

        {tabPanels}
      </Tabs>
    </div>
  );
};

export default ProductsListWithTabs;
