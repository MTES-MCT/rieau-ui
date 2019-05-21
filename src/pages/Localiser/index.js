import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../theme/withRoot';
import AppFooter from '../../components/AppFooter';
import AppAppBar from '../../components/AppAppBar';
import compose from '../../utils/compose';

const styles = theme => ({
  map: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: 200
    },
    height: 800,
    width: '100%'
  }
});

const basemapUrl = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
const communes = [
  { nom: 'Andeville', position: [49.25, 2.1667] },
  { nom: 'Baziège', position: [43.45, 1.6167] },
  { nom: 'Mours', position: [49.1333, 2.2667] },
  { nom: 'Nogent-sur-Oise', position: [49.2667, 2.4667] },
  { nom: 'La Crèche', position: [46.3667, -0.3] },
  { nom: 'Castanet-Tolosan', position: [43.5167, 1.5] },
  { nom: 'Saint-Tropez', position: [43.2667, 6.6333] }
];
class Localiser extends React.Component {
  state = {
    position: [45.9167, 1.8833]
  };
  render() {
    const { classes } = this.props;
    const { position } = this.state;
    return (
      <React.Fragment>
        <AppAppBar />
        <LeafletMap center={position} zoom={6} className={classes.map}>
          <TileLayer
            attribution={`données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>`}
            url={basemapUrl}
          />
          {communes.map(commune => (
            <Marker key={commune.nom} position={commune.position}>
              <Popup>
                {`Commune partenaire:`}
                <br />
                {commune.nom}
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
        <AppFooter />
      </React.Fragment>
    );
  }
}

Localiser.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(Localiser);
