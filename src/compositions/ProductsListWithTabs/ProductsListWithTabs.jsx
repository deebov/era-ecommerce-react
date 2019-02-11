import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import ProductsList from '../../containers/ProductsList/ProductsList';
import styles from './ProductsListWithTabs.module.css';

class ProductsListWithTabs extends Component {
  state = {
    tabIndex: 0,
  };
  render() {
    const tabs = this.props.lists.map((l, i) => (
      <Tab key={i} className={styles.Tab} selectedClassName={styles.TabActive}>
        {l.title}
      </Tab>
    ));
    // const tabPanels = ;

    return (
      <div>
        <Tabs onSelect={idx => this.setState({ tabIndex: idx })}>
          <TabList className={styles.TabList}>{tabs}</TabList>

          {this.props.lists.map((l, i) => (
            <TabPanel key={i}>
              <ProductsList id={l.id} isOpened={this.state.tabIndex === i} />
            </TabPanel>
          ))}
        </Tabs>
      </div>
    );
  }
}

export default ProductsListWithTabs;
