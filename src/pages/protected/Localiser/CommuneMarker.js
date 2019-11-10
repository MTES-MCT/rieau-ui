import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppTheme from 'theme/AppTheme';
import compose from 'utils/compose';
import PropTypes from 'prop-types';
import { Marker, Popup } from 'react-map-gl';
import CommunePin from './CommunePin';
import ChercherAdresse from './ChercherAdresse';
import Typography from 'components/Typography';
import Paper from '@material-ui/core/Paper';
import { Link as RouterLink } from 'react-router-dom';
import Button from 'components/Button';
import Box from '@material-ui/core/Box';
import { parcellesSurfaceTotale } from 'utils/parcelles';

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

function CommuneMarker(props) {
  const {
    classes,
    commune,
    adresse,
    onClickSelectAddress,
    resetCommune,
    resetAdresse,
    parcelles,
    setErreur
  } = props;
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
  const [showPopup, setShowPopup] = useState(true);
  return (
    <AppTheme>
      {commune && (
        <React.Fragment>
          <Marker longitude={longitude} latitude={latitude}>
            <CommunePin size={20} onClick={() => setShowPopup(true)} />
          </Marker>
          {showPopup && (
            <Popup
              longitude={longitude}
              latitude={latitude}
              anchor="top"
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup(false)}
            >
              {!adresse ? (
                <ChercherAdresse
                  commune={commune}
                  onClickSelectAddress={onClickSelectAddress}
                  resetCommune={resetCommune}
                  setErreur={setErreur}
                />
              ) : (
                <Paper className={classes.parcelles}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    p={1}
                    m={1}
                    alignItems="center"
                  >
                    <Box p={1} justifyContent="center">
                      <Typography variant="subtitle2">
                        {`${parcelles.length} parcelles sélectionnées à ${adresse.label}`}
                      </Typography>
                      <Typography variant="body2">
                        {`Pour une surface totale de ${parcellesSurfaceTotale(
                          parcelles
                        )} m²`}
                      </Typography>
                    </Box>
                    <Box p={1}>
                      <Button
                        color="secondary"
                        component={RouterLink}
                        variant="contained"
                        to="/deposer"
                      >
                        {`Déposer`}
                      </Button>
                      <Button
                        color="inherit"
                        variant="outlined"
                        onClick={resetAdresse}
                      >
                        {`Changer d'adresse`}
                      </Button>
                    </Box>
                  </Box>
                </Paper>
              )}
            </Popup>
          )}
        </React.Fragment>
      )}
    </AppTheme>
  );
}
CommuneMarker.propTypes = {
  adresse: PropTypes.object,
  commune: PropTypes.object,
  parcelles: PropTypes.array,
  classes: PropTypes.object.isRequired,
  onClickSelectAddress: PropTypes.func.isRequired,
  resetCommune: PropTypes.func.isRequired,
  resetAdresse: PropTypes.func.isRequired,
  setErreur: PropTypes.func.isRequired
};
export default compose(withStyles(styles))(CommuneMarker);
