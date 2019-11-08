import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'utils/compose';
import Message from './Message';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const styles = theme => ({
  grid: {
    display: 'flex',
    flexGrow: 1
  }
});

function MessageChat(props) {
  const { message } = props;
  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <React.Fragment>
      {isSmallMedia ? (
        <Grid item xs={12}>
          <Message message={message} />
        </Grid>
      ) : (
        <React.Fragment>
          <Grid item xs={6}>
            {message.auteur.profils.includes('DEPOSANT') && (
              <Message message={message} />
            )}
          </Grid>
          <Grid item xs={6}>
            {message.auteur.profils.includes('INSTRUCTEUR') && (
              <Message message={message} />
            )}
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
MessageChat.propTypes = {
  message: PropTypes.object.isRequired
};

function MessagesChat(props) {
  const { classes, messages } = props;
  return (
    <Grid container className={classes.grid} spacing={1}>
      {messages.map((message, index) => (
        <MessageChat message={message} key={index} />
      ))}
    </Grid>
  );
}
MessagesChat.propTypes = {
  classes: PropTypes.object,
  messages: PropTypes.array.isRequired
};
export default compose(withStyles(styles))(MessagesChat);
