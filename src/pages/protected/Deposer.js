import React, { useState } from 'react';
import AppAppBar from 'components/AppAppBar';
import AppForm from 'components/AppForm';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';
import { withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from 'components/Button';
import dossiers from 'utils/dossiers';
import PropTypes from 'prop-types';
import compose from 'utils/compose';
import UploadFile from 'components/UploadFile';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  headers: {
    flexGrow: 1,
    display: 'flex'
  },
  form: {
    marginTop: theme.spacing(1)
  },
  card: {
    display: 'flex',
    flexDirection: 'column'
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  buttonWrapper: {
    margin: theme.spacing(1),
    position: 'relative'
  },
  buttonProgress: {
    color: 'inherit',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
});

function Deposer(props) {
  const { classes } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  function handleSubmit(event) {
    setIsSubmitting(true);
  }
  function handleReset(event) {
    setIsSubmitting(false);
  }
  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <form onSubmit={handleSubmit} className={classes.form}>
          <Card elevation={0} className={classes.card}>
            <CardContent>
              <UploadFile handleFile={dossiers.deposer} />
            </CardContent>
            <div className={classes.actions}>
              <div className={classes.buttonWrapper}>
                <Button
                  variant="contained"
                  className={classes.button}
                  color="secondary"
                  fullWidth
                  disabled={isSubmitting}
                  type="submit"
                  data-cy="deposer-btn"
                >
                  {'Enregistrer'}
                </Button>
                {isSubmitting && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}
              </div>
              <div className={classes.buttonWrapper}>
                <Button
                  variant="outlined"
                  className={classes.button}
                  onClick={handleReset}
                  color="inherit"
                  fullWidth
                >
                  {'Effacer'}
                </Button>
              </div>
            </div>
          </Card>
        </form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}
Deposer.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRoot,
  withStyles(styles)
)(Deposer);
