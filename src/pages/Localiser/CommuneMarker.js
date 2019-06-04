import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'theme/withRoot';
import compose from 'utils/compose';
import PropTypes from 'prop-types';
import { Marker } from 'react-map-gl';
import CommunePin from './CommunePin';

const maxPopupWidth = 400;

const styles = theme => ({
  searchInput: {
    display: 'flex'
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

class CommuneMarker extends Component {
  static propTypes = {
    adresse: PropTypes.object,
    commune: PropTypes.object,
    classes: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      adresses: []
    };
  }

  render() {
    const { commune, adresse } = this.props;
    const longitude = adresse
      ? adresse.position[1]
      : commune
      ? commune.longitude
      : null;
    const latitude = adresse
      ? adresse.position[0]
      : commune
      ? commune.latitude
      : null;
    return (
      <React.Fragment>
        {commune ? (
          <React.Fragment>
            <Marker longitude={longitude} latitude={latitude}>
              <CommunePin size={20} />
            </Marker>
          </React.Fragment>
        ) : (
          ''
        )}
      </React.Fragment>
    );
  }
}
export default compose(
  withRoot,
  withStyles(styles)
)(CommuneMarker);
