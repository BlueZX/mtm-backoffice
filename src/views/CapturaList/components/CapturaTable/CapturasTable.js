import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

// import { getInitials } from '../../../../helpers';
import ModalImage from "react-modal-image";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  },
  imgSmall: {
    width: 32,
    height: 42
  }
}));

const CapturasTable = props => {
  const { className, capturas, ...rest } = props;

  const classes = useStyles();

  const [selectedcapturas, setSelectedcapturas] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Coordenadas</TableCell>
                  <TableCell>Fecha</TableCell>
                  <TableCell>Muestra</TableCell>
                  <TableCell>Esp. Sospechosa</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {capturas.slice(0, rowsPerPage).map(captura => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={captura._id}
                  >

                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{captura.region.latitude.toFixed(2)} {captura.region.longitude.toFixed(2)}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                    <Typography variant="body1">{Date(captura.selectedDate)}</Typography>
                    </TableCell>

                    <TableCell>
                      {/* <img src={`data:${captura.filePath.type};base64,${captura.filePath.data}`} /> */}
                      <ModalImage
                        className={classes.imgSmall}
                        small={`data:${captura.filePath.type};base64,${captura.filePath.data}`}
                        large={`data:${captura.filePath.type};base64,${captura.filePath.data}`}
                        alt="Hello World!"
                      />
                    </TableCell>
                    <TableCell>
                      {captura.especiesSelected.map( esp => {
                        return <Typography key={esp.especieId} variant="body1">{esp.especieId}</Typography>
                      })}
                    </TableCell>
                    <TableCell>
                      {captura.activo ? <p>Activo</p> : <p>Inactivo</p>}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={capturas.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

CapturasTable.propTypes = {
  className: PropTypes.string,
  capturas: PropTypes.array.isRequired
};

export default CapturasTable;
