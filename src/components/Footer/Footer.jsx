import React from 'react';

import styles from './Footer.module.css';
import Column from './Column/Column';
import Grid from '../UI/Grid/Grid';

/** 
 * TODO
 * Implement select elements
*/

const Footer = () => {
  const columns = [
    {
      title: 'HELP & INFORMATION',
      links: [
        {
          title: 'Track Order',
          desc: 'Track Order',
          url: '/'
        },
        {
          title: 'Delivery & Returns',
          desc: 'Delivery & Returns',
          url: '/'
        },
        {
          title: 'Premier Delivery',
          desc: 'Premier Delivery',
          url: '/'
        },
        {
          title: 'FAQs',
          desc: 'FAQs',
          url: '/'
        }
      ]
    },
    {
      title: 'ABOUT SUPRO',
      links: [
        {
          title: 'About Us',
          desc: 'About Us',
          url: '/'
        },
        {
          title: 'Careers',
          desc: 'Careers',
          url: '/'
        },
        {
          title: 'Coporate',
          desc: 'Coporate',
          url: '/'
        },
        {
          title: 'Investors',
          desc: 'Investors',
          url: '/'
        }
      ]
    },
    {
      title: 'ONLINE SHOP',
      links: [
        {
          title: 'Shoes',
          desc: 'Shoes',
          url: '/'
        },
        {
          title: 'Bags',
          desc: 'Bags',
          url: '/'
        },
        {
          title: 'Wallets',
          desc: 'Wallets',
          url: '/'
        },
        {
          title: 'Belts',
          desc: 'Belts',
          url: '/'
        }
      ]
    },
    {
      title: 'LANGUAGE'
    },
    {
      title: 'CURRENCY'
    }
  ];
  const cols = columns.map((e, i) => {
    return <Column title={e.title} links={e.links} key={i} />;
  });
  return (
    <div className={styles.Footer}>
      <Grid elements={cols} lg={2} md={2} sm={6} xs={12} />
    </div>
  );
};

export default Footer;
