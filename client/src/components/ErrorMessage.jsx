import React, { Fragment } from 'react';
import { connect } from 'react-redux';

const ErrorMessage = ({ error }) => (
    <Fragment>
    {error.message && <div className="error">{error.message}</div>}
  </Fragment>
);

export default connect(store => ({ error: store.error }))(ErrorMessage);
//1st parameter is mapping the stores error to the component props