import React from 'react';
import PropTypes from 'prop-types';
import withRoot from 'theme/withRoot';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import compose from 'utils/compose';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
import Typography from 'components/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import VariantChip from 'components/VariantChip';

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  content: {
    display: 'flex'
  },
  root: {
    width: '100%',
    marginTop: theme.spacing(3)
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  table: {
    minWidth: 750
  },
  tableWrapper: {
    overflowX: 'auto'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  },
  nodata: {
    [theme.breakpoints.up('md')]: {
      textAlign: 'center'
    },
    [theme.breakpoints.down('sm')]: {
      textAlign: 'left'
    }
  }
});

function EnhancedTableHead(props) {
  const { classes, columns, order, orderBy, onRequestSort, onDelete } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">{''}</TableCell>
        {columns.map(column => (
          <TableCell
            key={column.id}
            align={column.numeric ? 'left' : 'right'}
            padding={column.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === column.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.id}
              direction={order}
              onClick={createSortHandler(column.id)}
            >
              {column.label}
              {orderBy === column.id && (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'tri descendant' : 'tri ascendant'}
                </span>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
        {onDelete && <TableCell padding="checkbox">{''}</TableCell>}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  onDelete: PropTypes.bool.isRequired
};

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  spacer: {
    flex: '1 1 100%'
  },
  title: {
    flex: '0 0 auto'
  }
}));

function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles();
  const { title, addComponent } = props;
  const hasAddComponent = addComponent !== undefined;

  return (
    <Toolbar className={clsx(classes.root, [classes.highlight])}>
      <div className={classes.title}>
        <Typography variant="h6" id="tableTitle">
          {title}
        </Typography>
      </div>
      <div className={classes.spacer} />
      <div>{hasAddComponent && addComponent}</div>
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  addComponent: PropTypes.object
};

function DataTable(props) {
  const {
    classes,
    rows,
    columns,
    title,
    onRowClick,
    addComponent,
    onDeleteClick
  } = props;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const hasAddComponent = addComponent !== undefined;
  const onDelete = onDeleteClick !== undefined;

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title={title}
          addComponent={hasAddComponent ? addComponent : undefined}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              columns={columns}
              onDelete={onDelete}
            />
            <TableBody>
              {rows &&
                rows.length > 0 &&
                stableSort(rows, getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={event => onRowClick.onClick(event, row.id)}
                        tabIndex={-1}
                        key={row.id}
                      >
                        <TableCell>
                          <Tooltip title={onRowClick.tooltip}>
                            <IconButton
                              data-cy="piecejointe-preview-btn"
                              onClick={event =>
                                onRowClick.onClick(event, row.id)
                              }
                              aria-label={onRowClick.tooltip}
                            >
                              <onRowClick.icon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {row.id}
                        </TableCell>
                        {columns
                          .filter(column => column.id !== 'id')
                          .map(column => (
                            <TableCell key={column.id} align="right">
                              {column.variantChip ? (
                                <VariantChip
                                  variantId={row[column.id]}
                                  variants={column.variants}
                                />
                              ) : row[column.id].label ? (
                                row[column.id].label
                              ) : (
                                row[column.id]
                              )}
                            </TableCell>
                          ))}
                        {onDelete && (
                          <TableCell>
                            <Tooltip title={onDeleteClick.tooltip}>
                              <IconButton
                                onClick={event =>
                                  onDeleteClick.onClick(event, row.id)
                                }
                                aria-label={onDeleteClick.tooltip}
                              >
                                <onDeleteClick.icon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        )}
                      </TableRow>
                    );
                  })}
              {rows && rows.length < 1 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell
                    colSpan={columns.length + 1}
                    className={classes.nodata}
                  >
                    {'Aucune donnée'}
                  </TableCell>
                </TableRow>
              )}
              {rows && rows.length > 0 && emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={columns.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          labelRowsPerPage="Lignes par page"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'page précédente'
          }}
          nextIconButtonProps={{
            'aria-label': 'page suivante'
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}
DataTable.propTypes = {
  classes: PropTypes.object.isRequired,
  onRowClick: PropTypes.object,
  onDeleteClick: PropTypes.object,
  addComponent: PropTypes.object,
  title: PropTypes.string.isRequired,
  rows: PropTypes.array.isRequired,
  actions: PropTypes.array,
  columns: PropTypes.array.isRequired
};

export default compose(
  withStyles(styles),
  withRoot
)(DataTable);
