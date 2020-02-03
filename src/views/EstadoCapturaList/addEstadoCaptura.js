import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField
  } from '@material-ui/core';

import axios from 'axios';

class addEstadoCaptura extends Component {

    state = {
        nombre: '',
        name:'',
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    onSubmit = () => {
        let data = {
            nombre: this.state.nombre,
            name: this.state.name
        };

        if(this.state.nombre && this.state.name){
            axios.post('http://vm.integralit.cl:13151/api/EstadoCaptura', data)
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
                    subheader="complete los campos para agregar un nuevo EstadoCaptura"
                    title="Añadir un EstadoCaptura"
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
                                helperText="Especifique un nombre para el EstadoCaptura"
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
                            <TextField
                                fullWidth
                                helperText="Especifique un nombre en ingles para el EstadoCaptura"
                                label="Name"
                                margin="dense"
                                name="name"
                                onChange={this.handleChange}
                                required
                                value={this.state.name}
                                variant="outlined"
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
                        Guardar EstadoCaptura
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

export default addEstadoCaptura;