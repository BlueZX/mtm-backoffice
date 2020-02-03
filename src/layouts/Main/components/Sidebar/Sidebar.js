import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
// import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import BugReportIcon from '@material-ui/icons/BugReport';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import ReceiptIcon from '@material-ui/icons/Receipt';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import AssessmentIcon from '@material-ui/icons/Assessment';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';

import { SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    // {
    //   title: 'Dashboard',
    //   href: '/dashboard',
    //   icon: <DashboardIcon />
    // },
    {
      title: 'Usuarios',
      href: '/users',
      icon: <PeopleIcon />
    },
    {
      title: 'Capturas',
      href: '/capturas',
      icon: <PhotoLibraryIcon />
    },
    {
      title: 'Tutoriales',
      href: '/tutoriales',
      icon: <ReceiptIcon />
    },
    {
      title: 'Grupo especies',
      href: '/grupoEspecies',
      icon: <GroupWorkIcon />
    },
    {
      title: 'Especies',
      href: '/especies',
      icon: <BugReportIcon />
    },
    {
      title: 'Estado de la captura',
      href: '/estadoCaptura',
      icon: <AssessmentIcon />
    },
    {
      title: 'Tipo de usuario',
      href: '/tipoUsuario',
      icon: <SupervisorAccountIcon />
    },
    {
      title: 'Practica',
      href: '/practica',
      icon: <PhotoCameraIcon />
    },
    // {
    //   title: 'Products',
    //   href: '/products',
    //   icon: <ShoppingBasketIcon />
    // },
    // {
    //   title: 'Authentication',
    //   href: '/sign-in',
    //   icon: <LockOpenIcon />
    // },
    // {
    //   title: 'Typography',
    //   href: '/typography',
    //   icon: <TextFieldsIcon />
    // },
    // {
    //   title: 'Icons',
    //   href: '/icons',
    //   icon: <ImageIcon />
    // },
    // {
    //   title: 'Account',
    //   href: '/account',
    //   icon: <AccountBoxIcon />
    // },
    // {
    //   title: 'Settings',
    //   href: '/settings',
    //   icon: <SettingsIcon />
    // }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        {/* <Profile /> */}
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
        {/* <UpgradePlan /> */}
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
