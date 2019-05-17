import React from 'react';
import { Paper, IconButton, InputBase } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import Search from '@material-ui/icons/Search';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      width: 200
    },
    [theme.breakpoints.up('lg')]: {
      width: 600
    }
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
});

function Localiser(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Localiser votre projet"
      />
      <IconButton
        className={classes.iconButton}
        aria-label="Rechercher"
        component={RouterLink}
        to="/localiser"
      >
        <Search />
      </IconButton>
    </Paper>
  );
}

Localiser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Localiser);
