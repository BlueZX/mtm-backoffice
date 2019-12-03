import React, {Component} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { AccountProfile, AccountDetails } from './components';
import axios from 'axios';

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(4)
//   }
// }));

class Account extends Component  {
  // const classes = useStyles();

  state = {
    id: '',
    nombre: '',
    apellidos: '',
    edad: '',
    email: '',
    estado: true,
    activo: true,
    genero: '',
    nick: '',
    pais: '',
    password: '',
  };

  componentDidMount = () => {
    this.getUser();
  }

  getUser = () => {
    axios.get('http://vm.integralit.cl:13151/api/usuario/'+localStorage.getItem("id"))
      .then( res => {
        console.log(res.data);
        let user = res.data.usuario;
        this.setState({
          id: user._id,
          nombre: user.nombre,
          apellidos: user.apellidos,
          edad: user.edad,
          email: user.email,
          genero: user.genero,
          nick: user.nick,
          pais: user.pais,
          password: user.password
        });
      });
  }

  render = () => {
    return (
      <div>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            lg={4}
            md={6}
            xl={4}
            xs={12}
          >
            <AccountProfile id={this.state.id} nombre={this.state.nombre} nick={this.state.nick } email={this.state.email } />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xl={8}
            xs={12}
          >
            <AccountDetails />
          </Grid>
        </Grid>
      </div>
    );
  }

}

export default Account;
