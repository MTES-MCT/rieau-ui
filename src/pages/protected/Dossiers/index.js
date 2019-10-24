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
import compose from 'utils/compose';
import { withRouter } from 'react-router';
import { useUser } from 'context/user-context';
import FileUploadButton from 'components/FileUploadButton';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

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
  async function handleSupprimerDossier(id) {
    await api.supprimerDossier(id);
    reload();
  }
  async function handleReject(err) {
    setError(err);
  }

  if (isRejected) return <Error error={error} />;
  if (isLoading) return <LinearProgress />;
  if (data && isFulfilled) {
    console.log('data=', JSON.stringify(data));
    return (
      <React.Fragment>
        <AppAppBar />
        <MUIDataTable
          title="Dossiers"
          data={data}
          columns={[
            { name: 'id', label: 'Id' },
            { name: 'type.libelle', label: 'Type' },
            { name: 'statutActuel.libelle', label: 'Statut' }
          ]}
          options={{
            filter: true,
            filterType: 'dropdown',
            responsive: 'scrollMaxHeight',
            customToolbar: () => {
              return isBeta && isDeposant ? (
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
              );
            },
            customToolbarSelect: (
              selectedRows,
              displayData,
              setSelectedRows
            ) => (
              <Tooltip title={'Supprimer'}>
                <IconButton
                  onClick={() =>
                    selectedRows.data.forEach(row =>
                      handleSupprimerDossier(data[row.dataIndex].id)
                    )
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            ),
            onRowClick: (rowData, rowState) => {
              history.push(`/dossiers/${rowData[0]}`);
            },
            textLabels: {
              body: {
                noMatch: 'Aucune donnée',
                toolTip: 'Trier',
                columnHeaderTooltip: column => `Trier par ${column.label}`
              },
              pagination: {
                next: 'Page suivante',
                previous: 'Page précédente',
                rowsPerPage: 'Lignes par page:',
                displayRows: 'de'
              },
              toolbar: {
                search: 'Rechercher',
                downloadCsv: 'Exporter en CSV',
                print: 'Imprimer',
                viewColumns: 'Voir les colonnes',
                filterTable: 'Filtrer'
              },
              filter: {
                all: 'Tout',
                title: 'Filtres',
                reset: 'Effacer'
              },
              viewColumns: {
                title: 'Voir les colonnes',
                titleAria: 'Voir/Cacher les colonnes'
              },
              selectedRows: {
                text: 'ligne(s) sélectionnées',
                delete: 'Supprimer',
                deleteAria: 'Supprimer les lignes sélectionnées'
              }
            }
          }}
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
