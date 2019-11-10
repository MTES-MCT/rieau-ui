import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import compose from 'utils/compose';
import { initiales } from 'users/people';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  avatar: {
    color: '#fff',
    backgroundColor: '#4874b8'
  }
});
function PersonneAvatar(props) {
  const { classes, personne } = props;
  return (
    <Avatar aria-label="initiales" className={classes.avatar}>
      {initiales(personne)}
    </Avatar>
  );
}
PersonneAvatar.propTypes = {
  classes: PropTypes.object,
  personne: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(PersonneAvatar);
