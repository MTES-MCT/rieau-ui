import React from 'react';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  FlyToInterpolator
} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer, TextLayer, PolygonLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'theme/withRoot';
import AppAppBar from 'components/AppAppBar';
import compose from 'utils/compose';
import Container from '@material-ui/core/Container';
import ControlPanel from './ControlPanel';
import communesPartenaires from './communesPartenaires';
import Snackbar from 'components/Snackbar';
import CommuneMarker from './CommuneMarker';
import {
  parcelleIsIncluded,
  parcelleCenter,
  parcelleIsContigue
} from 'utils/parcelles';

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
    padding: 2
  },
  nav: {
    position: 'absolute',
    top: 50,
    left: 30,
    padding: 2
  },
  parcelles: {
    position: 'absolute',
    top: 30,
    left: 90,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: 200,
      height: 340,
      fontSize: 10
    },
    [theme.breakpoints.up('sm')]: {
      width: 220,
      height: 340,
      fontSize: 14
    }
  },
  parcellesActions: {
    flexGrow: 1
  }
});

const DEFAULT_VIEWPORT = {
  latitude: 45.9167,
  longitude: 1.8833,
  zoom: 4,
  pitch: 0,
  bearing: 0
};

const MAP_STYLE =
  'https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json';

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
      error: null,
      parcellesTexts: [],
      parcellesGeoJson: []
    };
  }

  resetCommune = () => {
    this.setState({
      viewport: DEFAULT_VIEWPORT,
      communes: communesPartenaires,
      adresse: null,
      parcelles: [],
      commune: null,
      parcellesTexts: [],
      parcellesGeoJson: []
    });
  };

  resetAdresse = () => {
    const { commune } = this.state;
    this.setState({
      adresse: null,
      parcelles: []
    });
    this.onViewportChange({
      longitude: commune.longitude,
      latitude: commune.latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  };

  onViewportChange = viewport => {
    this.setState({ viewport: { ...this.state.viewport, ...viewport } });
  };

  goToCommune = ({ longitude, latitude }) => {
    this.resetCommune();
    this.onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  };

  onClickSelectAddress = adresse => {
    const { commune } = this.state;
    this.setState({ adresse: adresse });
    this.parcellesTexts(commune);
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

  retirerParcelle = parcelle => {
    const { parcelles } = this.state;
    if (parcelleIsIncluded(parcelle, parcelles)) {
      this.setState(state => {
        return {
          error: null,
          parcelles: state.parcelles.filter(p => p.id !== parcelle.id)
        };
      });
    }
  };

  ajouterParcelle = parcelle => {
    const { parcelles } = this.state;
    const maxParcelles = 10;
    if (parcelles.length > maxParcelles - 1) {
      this.setState({ error: `Maximum atteint de ${maxParcelles} parcelles.` });
    } else if (!parcelleIsContigue(parcelle, parcelles)) {
      this.setState({
        error: `La parcelle ${parcelle.properties.numero} n'est pas contiguë.`
      });
    } else {
      this.setState(state => {
        return {
          error: null,
          parcelles: state.parcelles.concat(parcelle)
        };
      });
    }
  };

  parcellesUrl = commune => {
    return `https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/${commune.code}/geojson/parcelles`;
  };

  showError = error => {
    window.console.log(error);
    this.setState({
      error:
        'Une erreur est survenue lors du chargement des parcelles cadastrales.'
    });
  };

  parcellesTexts = commune => {
    const init = {
      method: 'GET',
      headers: new Headers().append('Content-Type', 'application/json'),
      mode: 'cors'
    };
    fetch(this.parcellesUrl(commune), init)
      .then(data => data.json())
      .then(data => this.buildParcellesTexts(data))
      .catch(error => this.showError(error));
  };

  buildParcellesTexts = data => {
    this.setState({ parcellesGeoJson: data });
    this.setState({
      parcellesTexts: data.features.map(feature => ({
        text: feature.properties.numero,
        position: parcelleCenter(feature).geometry.coordinates
      }))
    });
  };

  renderLayers = () => {
    const { adresse, parcellesTexts, parcellesGeoJson, parcelles } = this.state;
    if (!adresse) return [];
    return [
      new GeoJsonLayer({
        id: 'parcelles-polygon-layer',
        data: parcellesGeoJson,
        filled: true,
        pickable: true,
        stroked: true,
        extruded: false,
        opacity: 0.2,
        getFillColor: d => [60, 93, 170],
        getLineColor: [60, 93, 170],
        onClick: ({ object, x, y }) => {
          this.ajouterParcelle(object);
        }
      }),
      new TextLayer({
        id: 'parcelles-text-layer',
        data: parcellesTexts,
        getTextAnchor: 'middle',
        getAlignmentBaseline: 'center',
        getColor: d => [0, 0, 0],
        getSize: d => 20,
        sizeScale: 1,
        opacity: 0.6,
        getPixelOffset: [0, 15]
      }),
      new PolygonLayer({
        id: 'parcelles-selectionnes-layer',
        data: parcelles,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: true,
        lineWidthMinPixels: 1,
        opacity: 0.2,
        getPolygon: d => d.geometry.coordinates,
        getFillColor: d => [0, 17, 94],
        getLineColor: [0, 17, 94],
        getLineWidth: 1,
        onClick: ({ object, x, y }) => {
          this.retirerParcelle(object);
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
            reuseMaps
            onViewportChange={this.onViewportChange}
            width="100vw"
            height="90vh"
            maxPitch={85}
            mapStyle={MAP_STYLE}
          >
            <DeckGL layers={this.renderLayers()} viewState={viewport} />

            <FullscreenControl className={classes.fullscreen} />
            <NavigationControl className={classes.nav} />
            {!commune && (
              <ControlPanel
                communes={communesPartenaires}
                containerComponent={containerComponent}
                onViewportChange={this.goToCommune}
                onSelectCommune={this.onSelectCommune}
              />
            )}
            <CommuneMarker
              commune={commune}
              adresse={adresse}
              parcelles={parcelles}
              onClickSelectAddress={this.onClickSelectAddress}
              resetCommune={this.resetCommune}
              resetAdresse={this.resetAdresse}
            />
            {error && (
              <Snackbar
                message={error}
                variant="error"
                initialState={true}
                onClose={() => this.setState({ error: null })}
              />
            )}
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
