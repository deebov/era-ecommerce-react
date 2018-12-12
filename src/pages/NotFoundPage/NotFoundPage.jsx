import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { NOT_FOUND } from '../../constants/routes';

class NotFound extends Component {
  render() {
    const titleText = 'Page Not Found 🤦🏻‍';
    return (
      <div>
        <Helmet>
          <title>{titleText}</title>
        </Helmet>
        {this.props.location.pathname !== NOT_FOUND ? (
          <Redirect to={NOT_FOUND} />
        ) : null}
        <h1>Not Found</h1>
      </div>
    );
  }
}

export default withRouter(NotFound);
