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
    Typography
  } from '@material-ui/core';
//   import InputLabel from '@material-ui/core/InputLabel';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';

import axios from 'axios';

class addTipoUsuario extends Component {

    state = {
        nombre: '',
        tipoUsuario: '',
        tipoUsuarioId: '',
        tipoUsuarios: [],
    }

    componentDidMount = () => {
        axios.get('http://vm.integralit.cl:13151/api/tipoUsuario')
            .then(res => {
                console.log(res);
                this.setState({
                    tipoUsuarios: res.data.tipoUsuarios
                });
            })
            .catch(err => {
                console.log(err);
            });
    }


    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    handleChangeTipoUsuario = event => {
        this.setState({
            tipoUsuarioId: event.target.value
        });
    };

    clean = (obj) => {
        for (var propName in obj) { 
            if (obj[propName] === '' || obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }
    }


    onSubmit = () => {
        let data = {
            nombre: this.state.nombre,
            tipoUsuario: this.state.tipoUsuarioId,
        };

        this.clean(data);

        if(this.state.nombre){
            axios.post('http://vm.integralit.cl:13151/api/tipoUsuario', data)
                .then(res => {
                    console.log(res);
                    this.props.adding();
                })
                .catch(err => {
                    console.log(err);
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
                    subheader="complete los campos para agregar un nuevo tipo de usuario"
                    title="Añadir un Tipo de usuario"
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
                                helperText="Especifique un nombre para el tipo de usuario"
                                label="Nombre"
                                margin="dense"
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
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Seleccione un tipo de usario padre</Typography>
                            <FormControl >
                                {/* <InputLabel htmlFor="age-simple">Seleccione un tipo de usario padre</InputLabel> */}
                                <Select
                                value={this.state.tipoUsuarioId}
                                onChange={this.handleChangeTipoUsuario}
                                inputProps={{
                                    name: 'tipoUsuarios'
                                }}
                                >
                                    <MenuItem value='' >Sin tipo usuario padre</MenuItem>
                                    {this.state.tipoUsuarios.map( tip => {
                                        return <MenuItem key={tip._id} value={tip._id}>{tip.nombre}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
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
                        Guardar tipo usuario
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

export default addTipoUsuario;