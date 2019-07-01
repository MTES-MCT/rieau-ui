import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'components/Typography';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';

function Error(props) {
  const { error } = props;
  return (
    <React.Fragment>
      <AppAppBar />
      <Typography variant="h3" marked="center" align="center">
        {`500 | Erreur`}
      </Typography>
      <Typography variant="body1" marked="center" align="center">
        {error}
      </Typography>
      <AppFooter />
    </React.Fragment>
  );
}
Error.propTypes = {
  error: PropTypes.object.isRequired
};

export default Error;
