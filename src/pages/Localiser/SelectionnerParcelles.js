import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  }
});

function SelectionnerParcelles(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Recherchez des parcelles par addresse"
      />
    </Paper>
  );
}

SelectionnerParcelles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SelectionnerParcelles);
