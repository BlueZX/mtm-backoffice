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
    Typography,
    Switch,
    FormControlLabel ,
  } from '@material-ui/core';

import axios from 'axios';

class EditEstadoCaptura extends Component {

    state = {
        id: '',
        nombre: '',
        name: '',
        activo: true,
    }

    componentDidMount = () => {
        this.setState({
            id : this.props.tutorial._id,
            nombre: this.props.tutorial.nombre,
            name: this.props.tutorial.name,
            activo: this.props.tutorial.activo
        });
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    onChangeActivo = () => {
        this.setState({
            activo: !this.state.activo
        });
    }

    onSubmit = () => {
        let data = {
            nombre: this.state.nombre,
            name: this.state.name,
            activo: this.state.activo
        };

        if(this.state.nombre && this.state.name){
            axios.put('http://vm.integralit.cl:13151/api/EstadoCaptura/'+this.state.id, data)
                .then(res => {
                    console.log(res);
                    this.props.cancelBtn();
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
                    subheader="complete los campos para modificar el estado de la captura"
                    title="Modificando estado de la captura"
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
                                helperText="Especifique un nombre para el estado de la captura"
                                label="Estado Captura"
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
                                helperText="Especifique un nombre en ingles para el estado de la captura"
                                label="Capture state"
                                margin="dense"
                                name="name"
                                onChange={this.handleChange}
                                required
                                value={this.state.name}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Visibilidad en la APP </Typography>
                            <FormControlLabel
                                control={
                                <Switch checked={this.state.activo} onChange={this.onChangeActivo} value="activo" />
                                }
                                label="Activo"
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
                        Guardar estado de la captura
                    </Button>
                    <Button
                        color="primary"
                        variant="outlined"
                        onClick={this.props.cancelBtn}
                    >
                        Cancelar
                    </Button>
                </CardActions>
                </form>
            </Card>
        );
    }
}

export default EditEstadoCaptura;