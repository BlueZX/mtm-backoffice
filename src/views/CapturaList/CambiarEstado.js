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
  import ModalImage from "react-modal-image";
  import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import axios from 'axios';

class CambiarEstado extends Component {

    state = {
        id: '',
        especiesSospechosa: [],
        coordenadas: '',
        img: [],
        estadoCaptura: '',
        estadoCapturaId: '',
        activo: true,
        estados: [],
    }

    componentDidMount = () => {

        axios.get('http://vm.integralit.cl:13151/api/EstadoCaptura')
            .then(res => {
                console.log(res.data);
                this.setState({estados: res.data.estadoCaptura });
            })
            .catch(err => {
                console.log(err);
            });

        this.setState({
            id : this.props.captura._id,
            especiesSospechosa: this.props.captura.especiesSelected,
            coordenadas: this.props.captura.region.latitude,
            estadoCaptura: this.props.captura.estado.nombre,
            estadoCapturaId: this.props.captura.estado._id,
            img: this.props.captura.filePath,
            activo: this.props.captura.activo,
        });
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    handleChangeState = event => {
        this.setState({
          estadoCapturaId: event.target.value
        });
    };

    onChangeActivo = () => {
        this.setState({
            activo: !this.state.activo
        });
    }

    onSubmit = () => {
        let data = {
            estado: this.state.estadoCapturaId,
        };

        if(this.state.estadoCapturaId){
            axios.put('http://vm.integralit.cl:13151/api/Captura/'+this.state.id, data)
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
                    subheader="selecciona otro estado para cambiar el estado de la captura"
                    title="Cambiar estado captura"
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
                            <ModalImage
                                small={`data:${this.state.img.type};base64,${this.state.img.data}`}
                                large={`data:${this.state.img.type};base64,${this.state.img.data}`}
                                alt={this.state.id}
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Estado actual de la captura: {this.state.estadoCaptura}</Typography>
                            <FormControl >
                                <InputLabel htmlFor="age-simple">Seleccione un estado</InputLabel>
                                <Select
                                value={this.state.estadoCapturaId}
                                onChange={this.handleChangeState}
                                inputProps={{
                                    name: 'estados',
                                    id: 'age-simple',
                                }}
                                >
                                    {this.state.estados.map( est => {
                                        return <MenuItem key={est._id} value={est._id}>{est.nombre}</MenuItem>
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
                        Guardar Estado Captura
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

export default CambiarEstado;