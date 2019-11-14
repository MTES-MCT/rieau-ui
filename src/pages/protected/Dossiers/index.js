/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import AppAppBar from 'components/AppAppBar';
import AppFooter from 'components/AppFooter';
import AppTheme from 'theme/AppTheme';
import api from 'api/dossiers';
import { useAsync } from 'react-async';
import Error from 'pages/Error';
import LinearProgress from '@material-ui/core/LinearProgress';
import compose from 'utils/compose';
import { withRouter } from 'react-router';
import { useUser } from 'context/user-context';
import FileUploadButton from 'components/files/FileUploadButton';
import MUIDataTable from 'mui-datatables';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import format from 'format/dates';
import { Chip } from '@material-ui/core';
import { step } from 'pages/protected/Dossiers/steps';

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
  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down('sm'));
  const largeMediaColumns = [
    {
      name: 'type.libelle',
      label: 'Type'
    },
    {
      name: 'statutActuel.dateDebut',
      label: 'Depuis le',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => format(value)
      }
    },
    { name: 'statutActuel.joursRestants', label: 'Jours restants' }
  ];
  const smallMediaColumns = [
    { name: 'id', label: 'Id' },
    {
      name: 'statutActuel',
      label: 'Statut',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => (
          <Chip
            icon={step(value).icon}
            label={value.libelle}
            color="secondary"
          />
        )
      }
    }
  ];
  const columns = isSmallMedia
    ? smallMediaColumns
    : [...smallMediaColumns, ...largeMediaColumns];

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
    return (
      <AppTheme>
        <AppAppBar />
        <MUIDataTable
          title="Dossiers"
          data={data}
          columns={columns}
          options={{
            filter: true,
            filterType: 'dropdown',
            responsive: 'scrollFullHeight',
            rowsPerPage: 5,
            rowsPerPageOptions: [5, 10, 15],
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
            customToolbarSelect: (selectedRows, displayData, setSelectedRows) =>
              isBeta &&
              isDeposant && (
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
      </AppTheme>
    );
  }
}
Dossiers.propTypes = {
  history: PropTypes.object.isRequired
};

export default compose(withRouter)(Dossiers);
