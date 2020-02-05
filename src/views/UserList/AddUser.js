import React, { Component } from 'react';

import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
    Switch,
    FormControlLabel ,
    Typography
  } from '@material-ui/core';
  import { withSnackbar  } from 'notistack';

import axios from 'axios';

class AddUser extends Component {

    state = {
        nick: '',
        nombre: '',
        apellidos: '',
        email: '',
        password: '',
        password2: '',
        edad: '',
        idFoldscope: '',
        estado: true,
        role: false,
        genero: '',
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    onChangeActivo = () => {
        this.setState({
            role: !this.state.role
        });
    }

    onSubmit = () => {
        let rol = this.state.role ? 'ADMIN_ROLE' : 'USER_ROLE';

        let data = {
            nick: this.state.nick,
            nombre: this.state.nombre,
            apellidos: this.state.apellidos,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            // edad: this.state.edad,
            // idFoldscope: this.state.idFoldscope,
            // estado: this.state.estado,
            role: rol,
            // genero: this.state.genero,
        };

        if(this.state.password.length < 8){
            // variant could be success, error, warning, info, or default
            this.props.enqueueSnackbar('la contraseña debe contener como minimo 8 caracteres', { 
                variant: 'warning',
            });
        }

        if(this.state.nick && this.state.nombre && this.state.email && this.state.password.length > 7 && this.state.password2){
            axios.post('http://vm.integralit.cl:13151/api/usuario', data)
                .then(res => {
                    console.log(res);

                    this.props.enqueueSnackbar('Se ha creado el nuevo usuario correctamente', { 
                        variant: 'success',
                    });
                    
                    this.props.adding();
                })
                .catch((err, res) => {
                    if(this.state.password !== this.state.password2){

                        this.props.enqueueSnackbar("Las contraseñas deben ser iguales", { 
                            variant: 'error',
                        });
                    }
                    else{
                        this.props.enqueueSnackbar(err.message, { 
                            variant: 'error',
                        });
                    }
                    //this.props.adding();
                });
        }
        else{
            // variant could be success, error, warning, info, or default
            this.props.enqueueSnackbar('Se debe llenar todos los campos requeridos', { 
                variant: 'warning',
            });
        }
    }
    
    render() {
        return (
            <Card>
                <form
                    autoComplete="off"
                    noValidate
                >
                <CardHeader
                    subheader="complete los campos para agregar un nuevo usuario"
                    title="Añadir un usuario"
                />
                <Divider />
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Especifique un nick"
                                label="Nick"
                                margin="dense"
                                name="nick"
                                onChange={this.handleChange}
                                required
                                value={this.state.nick}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Especifique una correo electronico para el usuario"
                                label="Correo electronico"
                                margin="dense"
                                name="email"
                                onChange={this.handleChange}
                                required
                                value={this.state.email}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Especifique un nombre para el usuario"
                                label="Nombre"
                                margin="dense"
                                multiline
                                rowsMax="4"
                                name="nombre"
                                onChange={this.handleChange}
                                required
                                value={this.state.nombre}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Especifique apellidos para el usuario"
                                label="Apellidos"
                                margin="dense"
                                name="apellidos"
                                onChange={this.handleChange}
                                required
                                value={this.state.apellidos}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Especifique una contraseña para el usuario"
                                label="Contraseña"
                                margin="dense"
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                required
                                value={this.state.password}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Repita la contraseña para el usuario"
                                label="Repita la Contraseña"
                                margin="dense"
                                type="password"
                                name="password2"
                                onChange={this.handleChange}
                                required
                                value={this.state.password2}
                                variant="outlined"
                            />
                        </Grid>

                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Administrador </Typography>
                            <FormControlLabel
                                control={
                                <Switch checked={ this.state.role } onChange={ this.onChangeActivo } value="true" />
                                }
                                label="Administrador"
                            />
                        </Grid>


                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={this.onSubmit}
                    >
                        Guardar usuario
                    </Button>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={this.props.adding}
                    >
                        Cancelar
                    </Button>
                </CardActions>
                </form>
            </Card>
        );
    }
}

export default withSnackbar(AddUser);