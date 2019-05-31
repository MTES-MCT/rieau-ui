import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from 'components/Typography';
import { Marker, Popup } from 'react-leaflet';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MapIcon from '@material-ui/icons/Map';
import ParcellesLayer from './ParcellesLayer';
import { parcelleIsIncluded } from 'utils/parcelles';

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
  static propTypes = {
    classes: PropTypes.object.isRequired,
    adresse: PropTypes.object.isRequired,
    commune: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      parcelles: []
    };
  }

  onClickSelectParcelle = parcelle => {
    if (parcelleIsIncluded(parcelle, this.state.parcelles)) {
      this.setState({ error: 'La parcelle est déjà incluse!' });
      // }
      // else if (!parcelleIsContigue(parcelle, this.state.parcelles)) {
      //   this.setState({ error: "La parcelle n'est pas contiguë!" });
    } else {
      this.setState(state => {
        return {
          error: null,
          parcelles: state.parcelles.concat(parcelle)
        };
      });
    }
  };

  render() {
    const { classes, adresse, commune } = this.props;
    const { parcelles, error } = this.state;
    return (
      <React.Fragment>
        <ParcellesLayer
          commune={commune}
          adresse={adresse}
          onClickSelectParcelle={this.onClickSelectParcelle}
        />
        <Marker position={adresse.position}>
          <Popup maxWidth={400}>
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
                {`${parcelles.length} parcelles contiguës sélectionnées`}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                marked="center"
                align="center"
              >
                {error}
              </Typography>
              <List dense={true}>
                {parcelles.map((parcelle, key) => (
                  <ListItem key={key}>
                    <ListItemIcon>
                      <MapIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={`Parcelle: ${parcelle.properties.id}`}
                      secondary={`Préfixe: ${
                        parcelle.properties.prefixe
                      } - Section: ${parcelle.properties.section} - Numéro: ${
                        parcelle.properties.numero
                      } - Contenance: ${parcelle.properties.contenance}`}
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

export default withStyles(styles)(AdresseMarker);
