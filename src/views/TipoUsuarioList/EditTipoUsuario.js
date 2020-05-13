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

  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';
import axios from 'axios';

class EditTipoUsuario extends Component {

    state = {
        id: '',
        nombre: '',
        name: '',
        tipoUsuario: '',
        tipoUsuarioId: '',
        tipoUsuarios: [],
        activo: true,
    }

    componentDidMount = () => {
        this.setState({
            id : this.props.tutorial._id,
            nombre: this.props.tutorial.nombre,
            name: this.props.tutorial.name,
            tipoUsuarioId: (this.props.tutorial.tipoUsuario ? this.props.tutorial.tipoUsuario._id : ''),
            tipoUsuarios: this.props.tipoUsuarios || [],
            activo: this.props.tutorial.activo
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


    onChangeActivo = () => {
        this.setState({
            activo: !this.state.activo
        });
    }

    // clean = (obj) => {
    //     for (var propName in obj) { 
    //         if (obj[propName] === '' || obj[propName] === null || obj[propName] === undefined) {
    //             delete obj[propName];
    //         }
    //     }
    // }

    onSubmit = () => {

        let tuId = this.state.tipoUsuarioId ;
        
        if (tuId === ''){
            tuId = null;
        }
        let data = {
            nombre: this.state.nombre,
            name: this.state.name,
            tipoUsuario: tuId,
            activo: this.state.activo,
        };

        // this.clean(data);

        if(this.state.nombre && this.state.name){
            axios.put('http://vm.integralit.cl:13151/api/tipoUsuario/'+this.state.id, data)
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
                    subheader="complete los campos para modificar el tipo usuario"
                    title="Modificando tipo usuario"
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
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                fullWidth
                                helperText="Especifique un nombre en ingles para el tipo de usuario"
                                label="Name"
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
                        Guardar tipo usuario
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

export default EditTipoUsuario;