import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ProductsListWithTabs from '../../compositions/ProductsListWithTabs/ProductsListWithTabs';
import { LANDING as landingTitle } from '../../constants/titles';

const LandingPage = props => {
  return (
    <div>
      <Helmet defer={false}>
        <title>{landingTitle}</title>
      </Helmet>
      <ProductsListWithTabs lists={props.lists} />
    </div>
  );
};

LandingPage.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = state => {
  return {
    lists: state.lists.listsConfigs,
  };
};

export default connect(mapStateToProps)(LandingPage);
