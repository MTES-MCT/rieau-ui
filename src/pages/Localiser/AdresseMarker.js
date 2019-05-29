import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'components/Typography';
import { Marker, Popup } from 'react-leaflet';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
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
  constructor(props) {
    super(props);
    this.state = {
      parcelles: []
    };
  }

  addParcelle(parcelle) {
    this.state.parcelles.add(parcelle);
  }

  render() {
    const { classes, adresse, commune } = this.props;
    const { parcelles } = this.state;
    return (
      <React.Fragment>
        <ParcellesLayer
          commune={commune}
          adresse={adresse}
          addParcelle={this.addParcelle}
        />
        <Marker position={adresse.position}>
          <Popup maxWidth={400} closeButton={false} autoClose={false}>
            <Container className={classes.popupContainer}>
              <Typography
                variant="h6"
                gutterBottom
                marked="center"
                align="center"
              >
                {adresse.label}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                marked="center"
                align="center"
              >
                {`Sélectionner des parcelles contiguës`}
              </Typography>
              <List dense={true}>
                {parcelles.map((parcelle, key) => (
                  <ListItem key={key}>
                    <ListItemText
                      primary={parcelle.prefix + parcelle.numero}
                      secondary={parcelle.section}
                    />
                  </ListItem>
                ))}
              </List>
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
