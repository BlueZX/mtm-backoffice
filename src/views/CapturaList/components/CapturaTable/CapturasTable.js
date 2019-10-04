import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from '@material-ui/core/IconButton';

// import { getInitials } from '../../../../helpers';
import Modal from '@material-ui/core/Modal';
import ModalImage from "react-modal-image";

import CambiarEstado from '../../CambiarEstado';
// import axios from 'axios';

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
  },
  paper: {
    position: 'absolute',
    width: 80+'%',
    maxHeight: 80+'%',
    overflow:'scroll',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const getModalStyle = () => {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const CapturasTable = props => {
  const { className, capturas, getCapturas,  ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [cap, setCap] = React.useState({});

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleChange = (e, captura) => {
    console.log(captura);
    setCap(captura);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getCapturas();
    setOpen(false);
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
                {capturas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(captura => (
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
                    <Typography variant="body1">{captura.selectedDate}</Typography>
                    </TableCell>

                    <TableCell>
                      {/* <img src={`data:${captura.filePath.type};base64,${captura.filePath.data}`} /> */}
                      <ModalImage
                        className={classes.imgSmall}
                        small={`data:${captura.filePath.type};base64,${captura.filePath.data}`}
                        large={`data:${captura.filePath.type};base64,${captura.filePath.data}`}
                        alt={captura._id}
                      />
                    </TableCell>
                    <TableCell>
                      {captura.especiesSelected.map( esp => {
                        return <Typography key={esp.especieId} variant="body1">{esp.especieId}</Typography>
                      })}
                    </TableCell>
                    <TableCell>
                      {/* {captura.activo ? <p>Activo</p> : <p>Inactivo</p>} */}
                      {captura.estado.nombre}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={ (e) => { handleChange(e, captura) }} >
                        <DoneIcon />
                      </IconButton>
                      <IconButton aria-label="delete" >
                        <DeleteIcon />
                      </IconButton>
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



      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <CambiarEstado cancelBtn={handleClose} captura={cap} />
        </div>
      </Modal>

    </Card>
  );
};

CapturasTable.propTypes = {
  className: PropTypes.string,
  capturas: PropTypes.array.isRequired
};

export default CapturasTable;
