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

async function handleDepots() {
  return await depotsApi.mesDepots();
}

function Depots(props) {
  const { data, error, isRejected, isLoading } = useAsync({
    promiseFn: handleDepots
  });
  const { history } = props;
  if (isRejected) return <Error error={error.message} />;
  if (isLoading) return <LinearProgress />;
  if (data) {
    const { depots, page, totalCount } = data;
    return (
      <React.Fragment>
        <AppAppBar />
        <DataTable
          title="Mes dépôts"
          columns={[
            { title: 'Id', field: 'id', type: 'string' },
            { title: 'Type', field: 'type', type: 'string' },
            { title: 'Date', field: 'date', type: 'string' },
            { title: 'État', field: 'etat', type: 'string' }
          ]}
          data={{ data: depots, page, totalCount }}
          actions={[
            {
              icon: () => <VisibilityIcon />,
              tooltip: 'Voir le dépôt',
              onClick: (event, rowData) => history.push(`/depots/${rowData.id}`)
            }
          ]}
          options={{ actionsColumnIndex: -1 }}
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
