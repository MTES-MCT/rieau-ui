import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';

const styles = theme => ({
  card: {
    maxWidth: 400,
    marginBottom: theme.spacing(1)
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  actions: {
    display: 'flex'
  },
  button: {
    margin: theme.spacing(1)
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: 'inherit',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  }
});

function Message(props) {
  const { classes, message } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        title={`De la part de ${message.auteur.id} le ${message.date}`}
      />
      <CardContent className={classes.content}>{message.contenu}</CardContent>
    </Card>
  );
}
Message.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

export default withStyles(styles)(Message);
