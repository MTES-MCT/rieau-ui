import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'theme/withRoot';
import AppAppBar from 'components/AppAppBar';
import compose from 'utils/compose';
import Container from '@material-ui/core/Container';
import CommunesMarkers from './CommunesMarkers';
import Controls from './MapControls';
import communesPartenaires from './communesPartenaires';
import AdresseMarker from './AdresseMarker';

const styles = theme => ({
  map: {
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '90vh'
    },
    width: '100vw',
    height: '90vh'
  },
  containerMap: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center'
  }
});

const basemapUrl = 'https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';

const DEFAULT_VIEWPORT = {
  center: [45.9167, 1.8833],
  zoom: 6
};

class Localiser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      adresse: null,
      communes: communesPartenaires,
      commune: null
    };
    this.onViewportChanged = this.onViewportChanged.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onClickMarker = this.onClickMarker.bind(this);
    this.onClickSelectAddress = this.onClickSelectAddress.bind(this);
  }

  onClickReset = () => {
    this.setState({
      viewport: DEFAULT_VIEWPORT,
      communes: communesPartenaires,
      adresse: null,
      commune: null
    });
  };

  onViewportChanged = viewport => {
    this.setState({ viewport });
  };

  findCommuneByLatLng = (lat, lng) => {
    return communesPartenaires.find(
      commune => commune.position[0] === lat && commune.position[1] === lng
    );
  };

  onClickMarker = event => {
    const { lat, lng } = event.latlng;
    this.setState({
      viewport: { center: [lat, lng], zoom: 13 },
      commune: this.findCommuneByLatLng(lat, lng)
    });
  };

  onClickSelectAddress = adresse => {
    window.console.log('adresse=' + JSON.stringify(adresse));
    this.setState({
      communes: [],
      viewport: { center: adresse.position, zoom: 20 },
      adresse: adresse
    });
  };

  render() {
    const { classes } = this.props;
    const { viewport, adresse, communes, commune } = this.state;
    return (
      <React.Fragment>
        <AppAppBar />
        <Container className={classes.containerMap} data-cy="leaflet-map">
          <React.Fragment>
            <LeafletMap
              onViewportChanged={this.onViewportChanged}
              viewport={viewport}
              className={classes.map}
              ref={m => {
                this.leafletMap = m;
              }}
            >
              <Controls onClickReset={this.onClickReset} />
              <TileLayer
                attribution={`carte © <a href="//osm.org/copyright">OpenStreetMap</a>/<a href="https://opendatacommons.org/licenses/odbl/">ODbL</a> - rendu <a href="//openstreetmap.fr">OSM France</a>`}
                url={basemapUrl}
              />
              {commune !== null && adresse !== null ? (
                <AdresseMarker adresse={adresse} commune={commune} />
              ) : (
                <CommunesMarkers
                  communes={communes}
                  onClickMarker={this.onClickMarker}
                  onClickSelectAddress={this.onClickSelectAddress}
                />
              )}
            </LeafletMap>
          </React.Fragment>
        </Container>
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
