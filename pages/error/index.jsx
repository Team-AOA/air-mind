import React from 'react';
import PropTypes from 'prop-types';

import NotFoundPage from '../../components/Error1/404';
import InternalError from '../../components/Error1/500';

export default function Error({ errorStatus }) {
  const isError404 = errorStatus === 404;
  return (
    <>
      {isError404 && <NotFoundPage />}
      {!isError404 && <InternalError />}
    </>
  );
}

Error.propTypes = {
  errorStatus: PropTypes.number,
};

Error.defaultProps = {
  errorStatus: 500,
};
