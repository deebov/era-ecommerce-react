import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { NOT_FOUND } from '../../constants/routes';
import NotFound from '../../components/NotFound/NotFound';
import { NOT_FOUND as notFoundTitle } from '../../constants/titles';

const NotFoundPage = props => {
  return (
    <div>
      <Helmet defer={false}>
        <title>{notFoundTitle}</title>
      </Helmet>

      {this.props.location.pathname !== NOT_FOUND ? (
        <Redirect to={NOT_FOUND} />
      ) : null}

      <NotFound />
    </div>
  );
};

export default withRouter(NotFoundPage);
