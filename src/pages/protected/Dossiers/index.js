/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';
import api from 'utils/dossiers';
import { useAsync } from 'react-async';
import Error from 'pages/Error';
import LinearProgress from '@material-ui/core/LinearProgress';
import DataTable from 'components/DataTable';
import compose from 'utils/compose';
import { withRouter } from 'react-router';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useUser } from 'context/user-context';
import FileUploadButton from 'components/FileUploadButton';
import statuts from 'utils/steps';

async function handleDossiers() {
  return await api.listerDossiers();
}

function Dossiers(props) {
  const {
    data,
    error,
    setError,
    isRejected,
    isLoading,
    isFulfilled,
    reload
  } = useAsync({
    promiseFn: handleDossiers,
    onReject: handleReject
  });
  const { history } = props;
  const { isBeta, isDeposant } = useUser();

  async function handleAjouterDossier(formData) {
    await api.ajouterDossier(formData);
    reload();
  }
  async function handleReject(err) {
    setError(err);
  }

  if (isRejected) return <Error error={error} />;
  if (isLoading) return <LinearProgress />;
  if (data && isFulfilled) {
    return (
      <React.Fragment>
        <AppAppBar />
        <DataTable
          title="Dossiers"
          columns={[
            { label: 'Id', id: 'id', numeric: true, disablePadding: false },
            {
              label: 'Type',
              id: 'type',
              numeric: false,
              disablePadding: false
            },
            {
              label: 'Statut',
              id: 'statutActuel',
              numeric: false,
              disablePadding: false,
              variantChip: true,
              variants: statuts
            }
          ]}
          rows={data}
          onRowClick={{
            icon: () => <VisibilityIcon />,
            tooltip: 'Voir le dossier',
            onClick: (event, rowId) => history.push(`/dossiers/${rowId}`)
          }}
          addComponent={
            isBeta && isDeposant ? (
              <FileUploadButton
                iconName="add"
                color="secondary"
                label="Ajouter"
                variant="contained"
                onUploadFile={handleAjouterDossier}
                setError={setError}
                acceptedFormats={['application/pdf']}
              />
            ) : (
              undefined
            )
          }
        />
        <AppFooter />
      </React.Fragment>
    );
  }
}
Dossiers.propTypes = {
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withRoot
)(Dossiers);
