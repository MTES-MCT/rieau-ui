import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'components/Typography';
import { Marker, Popup } from 'react-leaflet';
import Container from '@material-ui/core/Container';
import ParcellesLayer from './ParcellesLayer';

const maxPopupWidth = 400;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  popupContainer: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: maxPopupWidth * 0.75
    },
    width: maxPopupWidth
  }
});

class AdresseMarker extends React.Component {
  render() {
    const { classes, adresse, commune } = this.props;
    return (
      <React.Fragment>
        <ParcellesLayer commune={commune} />
        <Marker position={adresse.position}>
          <Popup maxWidth={400}>
            <Container className={classes.popupContainer}>
              <Typography
                variant="h6"
                gutterBottom
                marked="center"
                align="center"
              >
                {adresse.nom}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                marked="center"
                align="center"
              >
                {`Sélectionner une parcelle`}
              </Typography>
            </Container>
          </Popup>
        </Marker>
      </React.Fragment>
    );
  }
}

AdresseMarker.propTypes = {
  classes: PropTypes.object.isRequired,
  adresse: PropTypes.object.isRequired,
  commune: PropTypes.object.isRequired
};

export default withStyles(styles)(AdresseMarker);
