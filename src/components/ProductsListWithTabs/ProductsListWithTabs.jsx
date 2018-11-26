import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ProductsList from '../../containers/ProductsList/ProductsList';
import styles from './ProductsListWithTabs.module.css';

const ProductsListWithTabs = props => {
  return (
    <div>
      <Tabs>
        <TabList className={styles.TabList}>
          <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
            Best Seller
          </Tab>
          <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
            New Arrivals
          </Tab>
          <Tab className={styles.Tab} selectedClassName={styles.TabActive}>
            Most Popular
          </Tab>
        </TabList>

        <TabPanel>
          <ProductsList />
        </TabPanel>
        <TabPanel>
          <h1>New Arrivals</h1>
        </TabPanel>
        <TabPanel>
          <h1>Most Popular</h1>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProductsListWithTabs;
