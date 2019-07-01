/* eslint-disable react/display-name */
import React, { forwardRef } from 'react';
import MaterialTable from 'material-table';
import PropTypes from 'prop-types';
import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import withRoot from 'theme/withRoot';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core';
import compose from 'utils/compose';
import Typography from './Typography';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const localization = {
  pagination: {
    labelDisplayedRows: '{from}-{to} sur {count}',
    labelRowsSelect: 'lignes',
    lastAriaLabel: 'Dernière page',
    lastTooltip: 'Dernière page',
    nextAriaLabel: 'Page suivante',
    nextTooltip: 'Page suivante',
    firstAriaLabel: 'Première page',
    firstTooltip: 'Première page',
    previousAriaLabel: 'Page précédente',
    previousTooltip: 'Page précédente'
  },
  toolbar: {
    nRowsSelected: '{0} ligne(s) sélectionnée(s)',
    searchPlaceholder: 'Rechercher...',
    searchTooltip: 'Rechercher'
  },
  body: {
    emptyDataSourceMessage: 'Aucune donnée',
    filterRow: {
      filterTooltip: 'Filtrer'
    }
  }
};
const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    display: 'flex'
  }
});

function DataTable(props) {
  const { classes, data, columns, title, actions, options } = props;
  return (
    <Card className={classes.card}>
      <CardHeader disableTypography>
        <Typography
          color="secondary"
          variant="h3"
          marked="center"
          align="center"
        >
          {title}
        </Typography>
      </CardHeader>
      <CardContent className={classes.content}>
        <MaterialTable
          style={{ width: '100%' }}
          icons={tableIcons}
          title={title}
          localization={localization}
          columns={columns}
          actions={actions}
          options={options}
          data={query =>
            new Promise((resolve, reject) => {
              return resolve({
                data: data.data,
                page: data.page,
                totalCount: data.totalCount
              });
            })
          }
        />
      </CardContent>
    </Card>
  );
}
DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  actions: PropTypes.array,
  options: PropTypes.object,
  columns: PropTypes.array.isRequired
};

export default compose(
  withStyles(styles),
  withRoot
)(DataTable);
