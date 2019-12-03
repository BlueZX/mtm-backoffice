import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
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
import axios from 'axios';
// import { getInitials } from '../../../../helpers';
import Modal from '@material-ui/core/Modal';
import ModalImage from "react-modal-image";
import EditGrupoEspecies from '../../EditGrupoEspecies';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const getModalStyle = () => {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
    width: 52,
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

const GrupoEspeciesTable = props => {
  const { className, grupoEspecies,getCapturas,activos, setEdit, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [tuto, setTuto] = React.useState({});
  const [idEdit, setId] = React.useState('');

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    getCapturas();
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    getCapturas();
    setOpenDialog(false);
  };
  
  const handleDelete = (e, id) => {

    console.log(id);
    setId(id);
    handleOpenDialog();
  };

  const handleClickDelete = () => {
    axios.delete('http://vm.integralit.cl:13151/api/grupoEspecies/'+idEdit)
      .then(res => {
        console.log(res);
        handleCloseDialog();
      })
      .catch(err => {
        console.log(err);
        handleCloseDialog();
      });
  }

  const handleEdit = (e, grupoEspecie) => {
    console.log(grupoEspecie);
    // axios.delete('http://vm.integralit.cl:13151/api/grupoEspecies/'+id)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // setEdit(id,);
    setTuto(grupoEspecie);
    handleOpen();
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
                  <TableCell>Nombre</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grupoEspecies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(grupoEspecie => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={grupoEspecie._id}
                  >

                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{grupoEspecie.nombre} </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                    <Typography variant="body1">{grupoEspecie.descripcion}</Typography>
                    </TableCell>

                    <TableCell>
                      <ModalImage
                        className={classes.imgSmall}
                        small={grupoEspecie.images}
                        large={grupoEspecie.images}
                        alt={grupoEspecie.nombre}
                      />

                    </TableCell>
                    <TableCell>
                      {grupoEspecie.activo ? <p>Activo</p> : <p>Inactivo</p>}
                    </TableCell>
                    <TableCell>
                    <IconButton aria-label="edit" onClick={ (e) => { handleEdit(e, grupoEspecie) } }>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={ (e) => { handleDelete(e, grupoEspecie._id) } }>
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
          count={grupoEspecies.length}
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
          <EditGrupoEspecies cancelBtn={handleClose} grupoEspecie={tuto} />
        </div>
      </Modal>


      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Esta seguro de eliminar este grupoEspecie?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al eliminar el grupoEspecie, este quedara inactivo y no sera visible
            en la aplicación movil.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickDelete} color="primary" autoFocus>
            Eliminar
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

    </Card>
    
  );
};

GrupoEspeciesTable.propTypes = {
  className: PropTypes.string,
  grupoEspecies: PropTypes.array.isRequired
};

export default GrupoEspeciesTable;
