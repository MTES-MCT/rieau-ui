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
import Button from 'components/Button';
import Typography from 'components/Typography';
import { dossierWorkflow } from 'pages/protected/Dossiers/steps';
import Grid from '@material-ui/core/Grid';
import EtapesStepper from 'pages/protected/Dossiers/EtapesStepper';
import { useUser } from 'context/user-context';
import AddMessageButton from 'pages/protected/Messages/AddMessageButton';
import FileUploadButton from 'components/FileUploadButton';
import EmailIcon from '@material-ui/icons/Email';
import AttachIcon from '@material-ui/icons/AttachFile';
import { Badge } from '@material-ui/core';
import PieceJointe from 'pages/protected/PiecesJointes/PieceJointe';
import { pieceJointe } from 'pages/protected/PiecesJointes/piecesjointes';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MessagesChat from 'pages/protected/Messages/MessagesChat';

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

function CerfaDecision(props) {
  const { dossier, setError, reload } = props;
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        {dossier.statutActuel.id === 'DECISION' && (
          <PieceJointe
            key={'d'}
            pieceJointe={pieceJointe(dossier, 'd')}
            setError={setError}
            reload={reload}
          />
        )}
        <React.Fragment>
          <Typography variant="h6" marked="center" align="center">
            {`CERFA déposé initialement sur service-public.fr`}
          </Typography>
          <PieceJointe
            key={dossier.cerfa.numero}
            pieceJointe={pieceJointe(dossier, dossier.cerfa.numero)}
            setError={setError}
            reload={reload}
          />
        </React.Fragment>
      </Grid>
    </Grid>
  );
}
CerfaDecision.propTypes = {
  dossier: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired
};

function Actions(props) {
  const { dossier, match, setError, reload } = props;
  const id = match.params.id;
  const { isMairie, isInstructeur } = useUser();

  async function handleQualifier() {
    await api.qualifierDossier(id);
    reload();
  }
  async function handleDeclarerIncomplet(contenu) {
    await api.declarerIncompletDossier(id, contenu);
    reload();
  }
  async function handleDeclarerComplet() {
    await api.declarerCompletDossier(id);
    reload();
  }
  async function handlePrendreDecision(formData) {
    await api.prendreDecision(id, formData);
    reload();
  }
  return (
    <div>
      {isMairie && dossier.statutActuel.id === 'DEPOSE' && (
        <Button
          variant="contained"
          color="secondary"
          onClick={event => handleQualifier()}
          data-cy="qualifier-btn"
        >
          {`Qualifier`}
        </Button>
      )}
      {isInstructeur &&
        ['QUALIFIE', 'INCOMPLET'].includes(dossier.statutActuel.id) && (
          <React.Fragment>
            <Button
              variant="contained"
              color="secondary"
              onClick={event => handleDeclarerComplet()}
              data-cy="declarer-complet-btn"
            >
              {`Déclarer complet`}
            </Button>
            <AddMessageButton
              label={'Déclarer incomplet'}
              dossierId={dossier.id}
              onSaveMessage={(event, contenu) =>
                handleDeclarerIncomplet(contenu)
              }
            />
          </React.Fragment>
        )}
      {isMairie && dossier.statutActuel.id === 'COMPLET' && (
        <FileUploadButton
          iconName="attach_file"
          color="secondary"
          label="Prendre décision"
          variant="contained"
          onUploadFile={handlePrendreDecision}
          setError={setError}
          acceptedFormats={['application/pdf']}
        />
      )}
    </div>
  );
}
Actions.propTypes = {
  dossier: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  setError: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired
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
          <AppBar position="static">
            <Tabs
              value={tabValue}
              onChange={handleChange}
              aria-label="onglets"
              centered
              variant="fullWidth"
            >
              <Tab label="Étapes" {...a11yProps(0)} />
              <Tab label="CERFA" {...a11yProps(1)} />
              <Tab
                icon={
                  <Badge
                    className={classes.badge}
                    badgeContent={dossier.piecesJointes.length}
                    max={10}
                    color="primary"
                  >
                    <AttachIcon />
                  </Badge>
                }
                label="Pièces"
                {...a11yProps(2)}
              />
              <Tab
                icon={
                  <Badge
                    className={classes.badge}
                    badgeContent={dossier.messages.length}
                    max={10}
                    color="primary"
                  >
                    <EmailIcon />
                  </Badge>
                }
                label="Messages"
                {...a11yProps(3)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={1} className={classes.grid}>
              <Grid item xs={12}>
                <JoursRestants dossier={dossier} />
                <EtapesStepper
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
            <CerfaDecision
              dossier={dossier}
              setError={setError}
              reload={reload}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {dossier.piecesAJoindre.map(pieceAJoindre => (
              <PieceJointe
                key={pieceAJoindre}
                pieceJointe={pieceJointe(dossier, pieceAJoindre)}
                setError={setError}
                reload={reload}
              />
            ))}
          </TabPanel>
          <TabPanel value={tabValue} index={3}>
            <Grid container spacing={1} className={classes.grid}>
              <Grid item xs={12}>
                {((isDeposant && isBeta) || isInstructeur) && (
                  <AddMessageButton
                    label={'Ajouter'}
                    onSaveMessage={(event, contenu) =>
                      handleSaveMessage(contenu)
                    }
                    dossierId={dossier.id}
                  />
                )}
                <MessagesChat messages={dossier.messages} />
              </Grid>
            </Grid>
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
