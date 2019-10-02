import React from 'react';
import PropTypes from 'prop-types';
import withRoot from 'theme/withRoot';
import { withRouter } from 'react-router-dom';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import compose from 'utils/compose';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { useAsync } from 'react-async';
import depots from 'utils/depots';
import Error from 'pages/Error';
import LinearProgress from '@material-ui/core/LinearProgress';
import NotFound from 'pages/NotFound';
import CardActions from '@material-ui/core/CardActions';
import Button from 'components/Button';
import { Link as RouterLink } from 'react-router-dom';
import Typography from 'components/Typography';
import { typeLibelle } from 'utils/piecesjointes';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});

async function handleDepot({ id }) {
  return { depot: await depots.monDepot(id) };
}

function Depot(props) {
  const { classes, match } = props;
  const id = match.params.id;
  const { data = { depot: null }, error, isLoading, isRejected } = useAsync({
    promiseFn: handleDepot,
    id: id
  });
  if (isRejected) return <Error error={error.message} />;
  if (isLoading) return <LinearProgress />;
  if (data) {
    const { depot } = data;
    if (!depot) return <NotFound />;
    return (
      <React.Fragment>
        <AppAppBar />
        <Typography variant="h3" marked="center" align="center">
          {`Dépôt`}
        </Typography>
        <Card className={classes.card}>
          <CardHeader title={typeLibelle(depot.type)} />
          <CardContent className={classes.content}>
            Statut: {depots.statutLibelle(depot.statut)} - Déposé le:{' '}
            {depot.date}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              component={RouterLink}
              to={`/depots/${depot.id}/piecesjointes`}
              data-cy="piecesjointes-btn"
            >
              {`Pièces jointes`}
            </Button>
          </CardActions>
        </Card>
        <AppFooter />
      </React.Fragment>
    );
  }
}
Depot.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRoot,
  withRouter
)(Depot);
