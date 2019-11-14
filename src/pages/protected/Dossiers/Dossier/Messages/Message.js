import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import PersonneAvatar from 'components/PersonneAvatar';
import { nomCompletAvecProfils } from 'users/people';
import format from 'format/dates';

const styles = theme => ({
  card: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex'
  },
  content: {
    overflowWrap: 'break-word'
  }
});

function Message(props) {
  const { classes, message } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<PersonneAvatar personne={message.auteur} />}
        title={nomCompletAvecProfils(message.auteur)}
        subheader={`Le ${format(message.date)}`}
        className={classes.header}
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
