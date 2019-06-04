import React from 'react';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  FlyToInterpolator
} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'theme/withRoot';
import AppAppBar from 'components/AppAppBar';
import compose from 'utils/compose';
import Container from '@material-ui/core/Container';
import ControlPanel from './ControlPanel';
import communesPartenaires from './communesPartenaires';
import ChercherAdresse from './ChercherAdresse';
import CommuneMarker from './CommuneMarker';
import { parcelleIsIncluded } from 'utils/parcelles';
import Typography from 'components/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  map: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center'
  },
  fullscreen: {
    position: 'absolute',
    top: 10,
    left: 30,
    padding: '2px'
  },
  nav: {
    position: 'absolute',
    top: 50,
    left: 30,
    padding: '2px'
  },
  adresse: {
    position: 'absolute',
    top: 50,
    left: 30,
    padding: '2px'
  },
  parcelles: {
    position: 'absolute',
    top: 30,
    left: 90,
    padding: '2px',
    width: '200px',
    height: '300px'
  }
});

const DEFAULT_VIEWPORT = {
  latitude: 45.9167,
  longitude: 1.8833,
  zoom: 4,
  pitch: 0,
  bearing: 0
};

class Localiser extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    containerComponent: PropTypes.node
  };

  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
      communes: communesPartenaires,
      adresse: null,
      commune: null,
      parcelles: [],
      error: null
    };
  }

  reset = () => {
    this.setState({
      viewport: DEFAULT_VIEWPORT,
      communes: communesPartenaires,
      adresse: null,
      parcelles: [],
      commune: null
    });
  };

  onViewportChange = viewport => {
    this.setState({ viewport: { ...this.state.viewport, ...viewport } });
  };

  goToCommune = ({ longitude, latitude }) => {
    this.reset();
    this.onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  };

  onClickSelectAddress = adresse => {
    this.setState({ adresse: adresse });
    this.onViewportChange({
      latitude: adresse.position[0],
      longitude: adresse.position[1],
      zoom: 18,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  };

  onSelectCommune = commune => {
    this.setState({ commune: commune, adresse: null, parcelles: [] });
  };

  ajouterParcelle = parcelle => {
    window.console.log('parcelle=' + JSON.stringify(parcelle));
    if (this.state.parcelles.length > 2) {
      this.setState({ error: 'Maximum atteint de 3 parcelles.' });
    } else if (parcelleIsIncluded(parcelle, this.state.parcelles)) {
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

  renderLayers = () => {
    if (!this.state.commune) return [];
    const parcellesUrl = `https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/${
      this.state.commune.code
    }/geojson/parcelles`;
    return [
      new GeoJsonLayer({
        id: 'parcelles-polygon-layer',
        data: parcellesUrl,
        filled: true,
        pickable: true,
        autoHighlight: true,
        stroked: true,
        opacity: 0.1,
        onClick: ({ object, x, y }) => {
          this.ajouterParcelle(object.properties);
        }
      })
    ];
  };

  render() {
    const { classes, containerComponent } = this.props;
    const { viewport, commune, adresse, parcelles, error } = this.state;

    return (
      <React.Fragment>
        <AppAppBar />
        <Container className={classes.map} data-cy="map">
          <ReactMapGL
            {...viewport}
            onViewportChange={this.onViewportChange}
            width="100vw"
            height="90vh"
            maxPitch={85}
            mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
          >
            <DeckGL layers={this.renderLayers()} viewState={viewport} />

            <FullscreenControl className={classes.fullscreen} />
            <NavigationControl className={classes.nav} />
            <ControlPanel
              communes={communesPartenaires}
              containerComponent={containerComponent}
              onViewportChange={this.goToCommune}
              onSelectCommune={this.onSelectCommune}
            />
            <CommuneMarker commune={commune} adresse={adresse} />
            {!adresse ? (
              <ChercherAdresse
                className={classes.adresse}
                commune={commune}
                onClickSelectAddress={this.onClickSelectAddress}
              />
            ) : (
              ''
            )}
            {parcelles && parcelles.length > 0 ? (
              <Paper className={classes.parcelles}>
                <Typography variant="h6">
                  {`${parcelles.length} parcelles sélectionnées:`}
                </Typography>
                {error ? window.alert(error) : ''}
                {parcelles.map((parcelle, key) => (
                  <ListItem key={key}>
                    <ListItemText primary={`Parcelle ${parcelle.id + 1}`} />
                  </ListItem>
                ))}
              </Paper>
            ) : (
              ''
            )}
            {this._renderTooltip}
          </ReactMapGL>
        </Container>
      </React.Fragment>
    );
  }
}
export default compose(
  withRoot,
  withStyles(styles)
)(Localiser);
