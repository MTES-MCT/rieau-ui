import React, { useState } from 'react';
import ReactMapGL, {
  NavigationControl,
  FullscreenControl,
  FlyToInterpolator
} from 'react-map-gl';
import DeckGL from '@deck.gl/react';
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
import { parcelleCenter } from 'utils/parcelles';
import { renderLayers, parcellesUrl } from './parcellesLayers';

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

function Localiser(props) {
  const { classes, containerComponent } = props;
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const [communes, setCommunes] = useState(communesPartenaires);
  const [adresse, setAdresse] = useState();
  const [commune, setCommune] = useState();
  const [parcelles, setParcelles] = useState([]);
  const [parcellesTexts, setParcellesTexts] = useState([]);
  const [parcellesGeoJson, setParcellesGeoJson] = useState([]);
  const [erreur, setErreur] = useState();

  function resetCommune() {
    setViewport(DEFAULT_VIEWPORT);
    setCommunes(communesPartenaires);
    setAdresse(null);
    setParcelles([]);
    setCommune(null);
    setParcellesTexts([]);
    setParcellesGeoJson([]);
    setErreur(null);
  }

  function onViewportChange(viewport) {
    setViewport({ ...viewport });
  }

  function resetAdresse() {
    setAdresse(null);
    setParcelles([]);
    setErreur(null);
    onViewportChange({
      longitude: commune.longitude,
      latitude: commune.latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  }

  function goToCommune({ longitude, latitude }) {
    onViewportChange({
      longitude,
      latitude,
      zoom: 11,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  }

  function buildParcellesTexts(data) {
    setParcellesGeoJson(data);
    setParcellesTexts(
      data.features.map(feature => ({
        text: feature.properties.numero,
        position: parcelleCenter(feature).geometry.coordinates
      }))
    );
  }

  function showGlobalError(erreur) {
    window.console.log(erreur);
    setErreur(
      'Une erreur est survenue lors du chargement des parcelles cadastrales.'
    );
  }

  function fetchParcellesTexts(commune) {
    const init = {
      method: 'GET',
      headers: new Headers().append('Content-Type', 'application/json'),
      mode: 'cors'
    };
    fetch(parcellesUrl(commune), init)
      .then(data => data.json())
      .then(data => buildParcellesTexts(data))
      .catch(erreur => showGlobalError(erreur));
  }

  function onClickSelectAddress(adresse) {
    setAdresse(adresse);
    fetchParcellesTexts(commune);
    onViewportChange({
      latitude: adresse.position[0],
      longitude: adresse.position[1],
      zoom: 18,
      transitionInterpolator: new FlyToInterpolator(),
      transitionDuration: 3000
    });
  }

  function onSelectCommune(commune) {
    setCommune(commune);
    setAdresse(null);
    setParcelles([]);
  }

  return (
    <React.Fragment>
      <AppAppBar />
      <Container className={classes.map} data-cy="map">
        <ReactMapGL
          {...viewport}
          reuseMaps
          onViewportChange={onViewportChange}
          width="100vw"
          height="90vh"
          maxPitch={85}
          mapStyle={MAP_STYLE}
        >
          <DeckGL
            layers={renderLayers(
              adresse,
              parcellesTexts,
              parcellesGeoJson,
              parcelles,
              setParcelles,
              setErreur
            )}
            viewState={viewport}
          />

          <FullscreenControl className={classes.fullscreen} />
          <NavigationControl className={classes.nav} />
          {!commune && (
            <ControlPanel
              communes={communes}
              containerComponent={containerComponent}
              onViewportChange={goToCommune}
              onSelectCommune={onSelectCommune}
            />
          )}
          <CommuneMarker
            commune={commune}
            adresse={adresse}
            parcelles={parcelles}
            onClickSelectAddress={onClickSelectAddress}
            resetCommune={resetCommune}
            resetAdresse={resetAdresse}
            setErreur={setErreur}
          />
          {erreur && (
            <Snackbar
              message={erreur}
              variant="error"
              initialState={true}
              onClose={() => setErreur(null)}
            />
          )}
        </ReactMapGL>
      </Container>
    </React.Fragment>
  );
}
Localiser.propTypes = {
  classes: PropTypes.object.isRequired,
  containerComponent: PropTypes.node
};
export default compose(
  withRoot,
  withStyles(styles)
)(Localiser);
