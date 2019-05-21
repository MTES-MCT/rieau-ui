import React from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../theme/withRoot';
import AppFooter from '../../components/AppFooter';
import AppAppBar from '../../components/AppAppBar';
import compose from '../../utils/compose';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import Container from '@material-ui/core/Container';
import ChercherParcelles from './ChercherParcelles';

const styles = theme => ({
  map: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: 200
    },
    height: 800,
    width: '100%'
  },
  containerMap: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  containerNotFound: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  },
  searchInput: {
    display: 'flex'
  },
  popupContainer: {
    position: 'relative',
    flexDirection: 'column',
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: 200
    },
    width: 400
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
  }

  onClickReset = () => {
    this.setState({ viewport: DEFAULT_VIEWPORT });
  };

  onViewportChanged = viewport => {
    this.setState({ viewport });
  };

  zoomIn = event => {
    const { lat, lng } = event.latlng;
    this.setState({ viewport: { center: [lat, lng], zoom: 13 } });
  };

  render() {
    const { classes } = this.props;
    const { viewport } = this.state;
    return (
      <React.Fragment>
        <AppAppBar />
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Localiser le projet
        </Typography>
        <Container className={classes.containerMap}>
          <React.Fragment>
            <LeafletMap
              onClick={this.onClickReset}
              onViewportChanged={this.onViewportChanged}
              viewport={viewport}
              className={classes.map}
              ref={m => {
                this.leafletMap = m;
              }}
            >
              <TileLayer
                attribution={`données © <a href="//osm.org/copyright">OpenStreetMap</a>/ODbL - rendu <a href="//openstreetmap.fr">OSM France</a>`}
                url={basemapUrl}
              />
              {communes.map(commune => (
                <Marker
                  key={commune.nom}
                  position={commune.position}
                  onClick={this.zoomIn}
                >
                  <Popup maxWidth={400}>
                    <Container className={classes.popupContainer}>
                      <Typography
                        variant="h6"
                        gutterBottom
                        marked="center"
                        align="center"
                      >
                        {commune.nom}
                      </Typography>
                      <ChercherParcelles className={classes.searchInput} />
                    </Container>
                  </Popup>
                </Marker>
              ))}
            </LeafletMap>
          </React.Fragment>
        </Container>
        <Container className={classes.containerNotFound}>
          <Typography variant="h5" align="center">
            {`Votre commune n'apparaît pas ?`}
          </Typography>
          <Button
            color="secondary"
            variant="contained"
            size="medium"
            href="https://www.service-public.fr/particuliers/vosdroits/F17578"
          >
            {'Déposer en mairie le dossier papier'}
          </Button>
        </Container>
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
