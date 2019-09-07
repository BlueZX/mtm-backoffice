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
    width: 52,
    height: 42
  }
}));

const TutorialTable = props => {
  const { className, tutoriales, ...rest } = props;

  const classes = useStyles();

  const [selectedtutoriales, setSelectedtutoriales] = useState([]);
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
                  <TableCell>Titulo</TableCell>
                  <TableCell>Descripción</TableCell>
                  <TableCell>Imagen</TableCell>
                  <TableCell>Video URL</TableCell>
                  <TableCell>Duración</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tutoriales.slice(0, rowsPerPage).map(tutorial => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={tutorial._id}
                  >

                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Typography variant="body1">{tutorial.nombre} </Typography>
                      </div>
                    </TableCell>
                    <TableCell>
                    <Typography variant="body1">{tutorial.descripcion}</Typography>
                    </TableCell>

                    <TableCell>
                      <ModalImage
                        className={classes.imgSmall}
                        small={tutorial.link}
                        large={tutorial.link}
                        alt="Hello World!"
                      />

                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{tutorial.videoId}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body1">{tutorial.duracion}</Typography>
                    </TableCell>
                    <TableCell>
                      {tutorial.activo ? <p>Activo</p> : <p>Inactivo</p>}
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
          count={tutoriales.length}
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

TutorialTable.propTypes = {
  className: PropTypes.string,
  tutoriales: PropTypes.array.isRequired
};

export default TutorialTable;
