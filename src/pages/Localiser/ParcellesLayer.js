import React from 'react';
import { GeoJSON } from 'react-leaflet';
import Control from 'react-leaflet-control';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from 'components/Typography';
import { withStyles } from '@material-ui/core/styles';
import geojsonvt from 'geojson-vt';

const styles = theme => ({
  loading: {
    padding: theme.spacing(3, 2)
  }
});

class ParcellesLayer extends React.Component {
  static propTypes = {
    adresse: PropTypes.object.isRequired,
    commune: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    onClickSelectParcelle: PropTypes.func.isRequired
  };
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: null,
      isLoaded: false,
      parcelles: []
    };

    this.layer = React.createRef();
    // this.onEachFeature = this.onEachFeature.bind(this);
  }

  componentDidMount() {
    const { commune } = this.props;
    if (commune) this.rechercherParcelles(commune);
  }

  getGeoJSONStyle = (feature, layer) => {
    return {
      color: '#006400',
      weight: 5,
      opacity: 0.5
    };
  };

  handleOnEachFeature = (feature, layer) => {
    // if (feature.properties && feature.properties.numero) {
    layer.bindPopup(
      `<p>Numéro: ${feature.properties.numero}</p><p>Préfixe: ${
        feature.properties.prefixe
      }</p><p>Section: ${feature.properties.section}</p>`
    );
    layer.on({ click: this.clickToFeature.bind(this) });
    // }
  };

  clickToFeature = e => {
    const feature = e.target.feature;
    this.props.onClickSelectParcelle(feature);
  };

  // filter = (feature) => {
  //   if (this.geoJsonLayer.leafletElement && this.props.adresse && feature.geometry) {
  //     if (feature.geometry.type === 'Polygon') {
  //       return this.geoJsonLayer.leafletElement.LatLng(this.props.adresse.position).distanceTo(this.geoJsonLayer.leafletElement.polygon(feature.geometry.coordinates).getCenter()) < 4000;
  //     }
  //   } else {
  //     return true;
  //   }
  // };

  rechercherParcelles = async commune => {
    const layer = this.layer.current;
    const parcellesUrl =
      'https://cadastre.data.gouv.fr/bundler/cadastre-etalab/communes/';
    const parcellesUri = '/geojson/parcelles';
    return await fetch(parcellesUrl + commune.code + parcellesUri)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            parcelles: result
          });
          if (layer)
            layer.leafletElement.clearLayers().addData(geojsonvt(result));
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error,
            parcelles: []
          });
        }
      );
  };

  render() {
    const { classes, adresse } = this.props;
    const { error, parcelles, isLoaded } = this.state;
    if (error) {
      return (
        <Control position="topright">
          <Paper className={classes.loading}>
            <Typography variant="subtitle2">{`Erreur: ${error}`}</Typography>
          </Paper>
        </Control>
      );
    } else if (!isLoaded) {
      return (
        <Control position="topright">
          <Paper className={classes.loading}>
            <Typography variant="subtitle2">
              {`Chargement des parcelles en cours ...`}
            </Typography>
          </Paper>
        </Control>
      );
    } else {
      return (
        <GeoJSON
          key={`${adresse.value}`}
          data={parcelles}
          onEachFeature={this.handleOnEachFeature.bind(this)}
          // filter={this.filter}
          attribution={`adresses et cadastre © <a href="https://www.etalab.gouv.fr">Etalab</a>/<a href="https://www.etalab.gouv.fr/wp-content/uploads/2017/04/ETALAB-Licence-Ouverte-v2.0.pdf">Licence-Ouverte-v2.0</a>`}
          style={this.getGeoJSONStyle}
          ref={this.layer}
        />
      );
    }
  }
}

export default withStyles(styles)(ParcellesLayer);
