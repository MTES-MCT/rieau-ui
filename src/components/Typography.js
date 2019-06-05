import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiTypography from '@material-ui/core/Typography';

const styles = theme => ({
  markedH2Center: {
    height: 4,
    width: 73,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main
  },
  markedH3Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main
  },
  markedH4Center: {
    height: 4,
    width: 55,
    display: 'block',
    margin: `${theme.spacing(1)}px auto 0`,
    backgroundColor: theme.palette.secondary.main
  },
  markedH6Left: {
    height: 2,
    width: 28,
    display: 'block',
    marginTop: theme.spacing(0.5),
    background: 'currentColor'
  }
});

function Typography(props) {
  const { children, classes, marked, variant, ...other } = props;

  return (
    <MuiTypography variant={variant} {...other}>
      {children}
      {marked ? (
        <span className={classes[`marked${variant + marked}`]} />
      ) : null}
    </MuiTypography>
  );
}

Typography.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  marked: PropTypes.oneOf([false, 'center', 'left']),
  variant: PropTypes.string
};

Typography.defaultProps = {
  marked: false
};

export default withStyles(styles)(Typography);
