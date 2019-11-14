import React from 'react';
import PropTypes from 'prop-types';
import AppTheme from 'theme/AppTheme';
import { withRouter } from 'react-router-dom';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import compose from 'utils/compose';
import { makeStyles } from '@material-ui/core/styles';
import { useAsync } from 'react-async';
import api from 'api/dossiers';
import Error from 'pages/Error';
import LinearProgress from '@material-ui/core/LinearProgress';
import NotFound from 'pages/NotFound';
import Typography from 'components/Typography';
import { dossierWorkflow } from 'pages/protected/Dossiers/steps';
import Grid from '@material-ui/core/Grid';
import { useUser } from 'context/user-context';
import AddMessageButton from 'pages/protected/Dossiers/Dossier/Messages/AddMessageButton';
import EmailIcon from '@material-ui/icons/Email';
import AttachIcon from '@material-ui/icons/AttachFile';
import { Badge } from '@material-ui/core';
import PieceJointe from 'pages/protected/Dossiers/Dossier/PiecesJointes/PieceJointe';
import { pieceJointe } from 'pages/protected/Dossiers/Dossier/PiecesJointes/piecesjointes';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MessagesChat from 'pages/protected/Dossiers/Dossier/Messages/MessagesChat';
import Etapes from 'pages/protected/Dossiers/Dossier/Etapes';
import Actions from 'pages/protected/Dossiers/Dossier/Etapes/Actions';

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  grid: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  buttons: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  tabs: {
    flexGrow: 1
  }
}));

async function handleDossier({ id }) {
  return { dossier: await api.consulterDossier(id) };
}

function JoursRestants(props) {
  const { dossier } = props;
  return (
    <Typography variant="h6" marked="center" align="center">
      {dossier.statutsRestants.length > 0 &&
        `Il reste ${
          dossier.statutActuel.joursRestants
        } jours avant qu'il soit ${
          dossier.statutsRestants.length > 0
            ? ['INCOMPLET', 'COMPLET'].includes(dossier.statutsRestants[0].id)
              ? `déclaré ${dossier.statutsRestants[0].libelle} ou ${dossier.statutsRestants[1].libelle}`
              : dossier.statutsRestants[0].libelle
            : ''
        }`}
    </Typography>
  );
}
JoursRestants.propTypes = {
  classes: PropTypes.object,
  dossier: PropTypes.object.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();
  return (
    <Typography
      variant="body2"
      marked="center"
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Typography>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function Dossier(props) {
  const { match } = props;
  const classes = useStyles();
  const id = match.params.id;
  const { isDeposant, isBeta, isInstructeur } = useUser();
  const {
    data = { dossier: null },
    error,
    isLoading,
    isRejected,
    reload,
    setError
  } = useAsync({
    promiseFn: handleDossier,
    id: id
  });
  const [tabValue, setTabValue] = React.useState(0);
  function handleChange(event, newValue) {
    setTabValue(newValue);
  }
  async function handleSaveMessage(contenu) {
    await api.saveMessage(id, contenu);
    reload();
  }

  if (isRejected) return <Error error={error.message} />;
  if (isLoading) return <LinearProgress />;
  if (data) {
    const { dossier } = data;
    if (!dossier) return <NotFound />;
    return (
      <AppTheme>
        <AppAppBar />
        <Typography variant="h3" marked="center" align="center">
          {`Dossier n°${dossier.id}`}
        </Typography>
        <div className={classes.tabs}>
          <AppBar position="static" color="inherit">
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="onglets"
              centered
              indicatorColor="secondary"
              textColor="secondary"
              variant="fullWidth"
            >
              <Tab label="Étapes" data-cy="etapes-tab" {...a11yProps(0)} />
              <Tab
                icon={
                  <Badge
                    className={classes.badge}
                    badgeContent={dossier.piecesJointes.length}
                    max={100}
                    color="secondary"
                  >
                    <AttachIcon />
                  </Badge>
                }
                label="Pièces"
                data-cy="pieces-tab"
                {...a11yProps(1)}
              />
              <Tab
                icon={
                  <Badge
                    className={classes.badge}
                    badgeContent={dossier.messages.length}
                    max={100}
                    color="secondary"
                  >
                    <EmailIcon />
                  </Badge>
                }
                label="Messages"
                data-cy="messages-tab"
                {...a11yProps(2)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={1} className={classes.grid}>
              <Grid item xs={12}>
                <JoursRestants dossier={dossier} />
                <Etapes
                  steps={dossierWorkflow(dossier)}
                  activeStepId={dossier.statutActuel.id}
                />
                <Actions
                  dossier={dossier}
                  setError={setError}
                  reload={reload}
                  match={match}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {dossier.piecesAJoindre.map(pieceAJoindre => (
              <PieceJointe
                key={pieceAJoindre}
                pieceJointe={pieceJointe(dossier, pieceAJoindre)}
                setError={setError}
                reload={reload}
              />
            ))}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {((isDeposant && isBeta) || isInstructeur) && (
              <AddMessageButton
                onSaveMessage={(event, contenu) => handleSaveMessage(contenu)}
                dossierId={dossier.id}
              />
            )}
            <MessagesChat messages={dossier.messages} />
          </TabPanel>
        </div>
        <AppFooter />
      </AppTheme>
    );
  }
}
Dossier.propTypes = {
  match: PropTypes.object.isRequired
};

export default compose(withRouter)(Dossier);
