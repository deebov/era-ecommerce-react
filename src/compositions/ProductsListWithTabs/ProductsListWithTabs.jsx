import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ProductsList from '../../containers/ProductsList/ProductsList';
import styles from './ProductsListWithTabs.module.css';

const ProductsListWithTabs = props => {
  const [tabIndex, setTabIndex] = useState(0);

  const tabs = props.lists.map((l, i) => (
    <Tab key={i} className={styles.Tab} selectedClassName={styles.TabActive}>
      {l.title}
    </Tab>
  ));

  return (
    <div>
      <Tabs onSelect={idx => setTabIndex(idx)}>
        <TabList className={styles.TabList}>{tabs}</TabList>

        {props.lists.map((l, i) => (
          <TabPanel key={i}>
            <ProductsList id={l.id} isOpened={tabIndex === i} />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default ProductsListWithTabs;
