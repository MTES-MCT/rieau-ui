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
    height: '400px'
  }
});

const basemapUrl = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
const villes = {
  Andeville: { lat: 48.852969, lon: 2.349903 },
  Baziège: { lat: 48.383, lon: -4.5 }
};
class Localiser extends React.Component {
  state = {
    position: [48.852969, 2.349903]
  };
  render() {
    const { classes } = this.props;
    const { position } = this.state;
    return (
      <React.Fragment>
        <AppAppBar />
        <div className={classes.map}>
          <LeafletMap
            center={position}
            zoom={6}
            maxZoom={10}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
          >
            <TileLayer
              attribution={`données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>`}
              url={basemapUrl}
              opacity={0.3}
              zIndex={1}
            />
            <MarkerList />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </LeafletMap>
        </div>
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
