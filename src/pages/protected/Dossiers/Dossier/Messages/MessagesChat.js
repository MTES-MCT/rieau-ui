import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Message from 'pages/protected/Dossiers/Dossier/Messages/Message';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  grid: {
    flexGrow: 1
  }
}));

function isFromProfil(message, profil) {
  return message.auteur.profils.includes(profil);
}

function MessagesBigMediaChat(props) {
  const { messages } = props;
  return (
    <React.Fragment>
      {messages.length > 1
        ? messages.map((message, index) => (
            <React.Fragment key={index}>
              <Grid item xs={6}>
                {isFromProfil(message, 'DEPOSANT') && (
                  <Message message={message} />
                )}
              </Grid>
              <Grid item xs={6}>
                {isFromProfil(message, 'INSTRUCTEUR') && (
                  <Message message={message} />
                )}
              </Grid>
            </React.Fragment>
          ))
        : messages.length > 0 && <Message message={messages[0]} />}
    </React.Fragment>
  );
}
MessagesBigMediaChat.propTypes = {
  messages: PropTypes.array.isRequired
};

function MessagesChat(props) {
  const { messages } = props;
  const classes = useStyles();
  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Grid container spacing={1} className={classes.grid}>
      <Grid container item xs={12} spacing={3}>
        {!isSmallMedia ? (
          <MessagesBigMediaChat messages={messages} />
        ) : (
          messages.map((message, index) => (
            <Message message={message} key={index} />
          ))
        )}
      </Grid>
    </Grid>
  );
}
MessagesChat.propTypes = {
  messages: PropTypes.array.isRequired
};
export default MessagesChat;
