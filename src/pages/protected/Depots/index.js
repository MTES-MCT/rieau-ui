/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import withRoot from 'theme/withRoot';
import depotsApi from 'utils/depots';
import { useAsync } from 'react-async';
import Error from 'pages/Error';
import LinearProgress from '@material-ui/core/LinearProgress';
import DataTable from 'components/DataTable';
import compose from 'utils/compose';
import { withRouter } from 'react-router';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useUser } from 'context/user-context';
import FileUploadButton from 'components/FileUploadButton';
import statuts from 'utils/statutsDepot';

async function handleDepots() {
  return await depotsApi.mesDepots();
}

function Depots(props) {
  const {
    data,
    error,
    setError,
    isRejected,
    isLoading,
    isFulfilled,
    reload
  } = useAsync({
    promiseFn: handleDepots,
    onReject: handleReject
  });
  const { history } = props;
  const { isBeta, isDeposant } = useUser();

  async function handleAjouterDepot(formData) {
    await depotsApi.ajouterDepot(formData);
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
          title="Dépôts"
          columns={[
            { label: 'Id', id: 'id', numeric: false, disablePadding: false },
            {
              label: 'Type',
              id: 'type',
              numeric: false,
              disablePadding: false
            },
            {
              label: 'Date',
              id: 'date',
              numeric: false,
              disablePadding: false
            },
            {
              label: 'Statut',
              id: 'statut',
              numeric: false,
              disablePadding: false,
              variantChip: true,
              variants: statuts
            }
          ]}
          rows={data}
          onRowClick={{
            icon: () => <VisibilityIcon />,
            tooltip: 'Voir le dépôt',
            onClick: (event, rowId) => history.push(`/depots/${rowId}`)
          }}
          addComponent={
            isBeta && isDeposant ? (
              <FileUploadButton
                iconName="add"
                color="secondary"
                label="Ajouter"
                variant="contained"
                onUploadFile={handleAjouterDepot}
                setError={setError}
                acceptedFormats="application/pdf"
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
Depots.propTypes = {
  history: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withRoot
)(Depots);
