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
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import EditUser from '../../EditUser';
import { getInitials } from '../../../../helpers';

import axios from 'axios';

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

const UsersTable = props => {
  const { className, users,getUsuarios, activos, ...rest } = props;

  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [usuario, setUsuario] = React.useState({});
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
    getUsuarios();
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    getUsuarios();
    setOpenDialog(false);
  };

  
  const handleDelete = (e, id) => {

    console.log(id);
    setId(id);
    handleOpenDialog();
  };

  const handleClickDelete = () => {
    axios.delete('http://vm.integralit.cl:13151/api/usuario/'+idEdit)
      .then(res => {
        console.log(res);
        handleCloseDialog();
      })
      .catch(err => {
        console.log(err);
        handleCloseDialog();
      });
  }

  const handleEdit = (e, user) => {
    console.log(user);
    setUsuario(user);
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
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === users.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < users.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  <TableCell>Nombre de Usuario</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Correo Electronico</TableCell>
                  <TableCell>ID Foldscope</TableCell>
                  <TableCell>País</TableCell>
                  <TableCell>Plataforma</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={user._id}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(user._id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, user._id)}
                        value="true"
                      />
                    </TableCell> */}
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={user.avatarUrl}
                        >
                          {getInitials(user.nick)}
                        </Avatar>
                        <Typography variant="body1">{user.nick}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{user.nombre} {user.apellidos}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.idFoldscope}
                    </TableCell>
                    <TableCell>
                      {user.pais}
                    </TableCell>
                    <TableCell>
                      {(user.role === 'ADMIN_ROLE') ? <p>BackOffice</p> : <p>APP MOVIL</p>}
                    </TableCell>
                    <TableCell>
                      {user.activo ? <p>Activo</p> : <p>Inactivo</p>}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={ (e) => { handleEdit(e, user) } }>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={ (e) => { handleDelete(e, user._id) } }>
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
          count={users.length}
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
          <EditUser cancelBtn={handleClose} usuario={usuario} />
        </div>
      </Modal>


      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"¿Esta seguro de eliminar este usuario?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al eliminar el usario, este quedara inactivo y este no podrá
            ingresar a la aplicación movil o el BackOffice
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

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
