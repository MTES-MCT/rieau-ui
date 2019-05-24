import React from 'react';
import { Map as LeafletMap, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'theme/withRoot';
import AppAppBar from 'components/AppAppBar';
import compose from 'utils/compose';
import Container from '@material-ui/core/Container';
import CommunesMap from './CommunesMap';
import Controls from './MapControls';

const styles = theme => ({
  map: {
    flexGrow: 1,
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      height: '50vh'
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
    this.viewport = DEFAULT_VIEWPORT;
    this.state = {
      viewport: DEFAULT_VIEWPORT
    };
    this.onViewportChanged = this.onViewportChanged.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.onClickMarker = this.onClickMarker.bind(this);
  }

  onClickReset = () => {
    this.setState({ viewport: DEFAULT_VIEWPORT, commune: '' });
  };

  onViewportChanged = viewport => {
    this.setState({ viewport });
  };

  onClickMarker = event => {
    const { lat, lng } = event.latlng;
    this.setState({ viewport: { center: [lat, lng], zoom: 13 } });
  };

  onClickSelectAddress = address => {
    this.setState({ viewport: { center: address.position, zoom: 13 } });
  };

  render() {
    const { classes } = this.props;
    const { viewport } = this.state;
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
              <TileLayer
                attribution={`carte © <a href="//osm.org/copyright">OpenStreetMap</a>/<a href="https://opendatacommons.org/licenses/odbl/">ODbL</a> - rendu <a href="//openstreetmap.fr">OSM France</a>`}
                url={basemapUrl}
              />
              <Controls onClickReset={this.onClickReset} />
              <CommunesMap
                onClickMarker={this.onClickMarker}
                onClickSelectAddress={this.onClickSelectAddress}
              />
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
