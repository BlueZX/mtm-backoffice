import React, { Component } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
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

class EditGrupoEspecies extends Component {

    state = {
        id: '',
        nombre: '',
        name:'',
        descripcion: '',
        description: '',
        images: '',
        img: '',
        activo: true,
    }

    componentDidMount = () => {
        this.setState({
            id : this.props.grupoEspecie._id,
            nombre: this.props.grupoEspecie.nombre,
            name: this.props.grupoEspecie.name,
            descripcion: this.props.grupoEspecie.descripcion,
            description: this.props.grupoEspecie.description,
            img: this.props.grupoEspecie.images,
            activo: this.props.grupoEspecie.activo
        });
    }
    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    };

    onChangeImg = (e) => {

        const file = new FormData();
        file.append('archivo', e.target.files[0]);

        // this.setState({img:  URL.createObjectURL(e.target.files[0])});

        if(e.target.files[0]){

            axios.post('http://vm.integralit.cl:13151/api/upload/grupoEspecies', file)
            .then(res => {
                this.setState({
                    img: "http://vm.integralit.cl:13151/uploads/grupoEspecies/" + res.data.nombre
                });
                console.log(res);

            })
            .catch(err => {
                console.log(err);
            });
        }
    }

    onChangeActivo = () => {
        this.setState({
            activo: !this.state.activo
        });
    }

    onSubmit = () => {
        let data = {
            nombre: this.state.nombre,
            name: this.state.name,
            descripcion: this.state.descripcion,
            description: this.state.description,
            images: this.state.img,
            activo: this.state.activo
        };

        if(this.state.nombre && this.state.name && this.state.description && this.state.descripcion && this.state.img){
            axios.put('http://vm.integralit.cl:13151/api/grupoEspecies/'+this.state.id, data)
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
                    subheader="complete los campos para modificar el grupo especie"
                    title="Modificando grupo especie"
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
                                helperText="Especifique un nombre para el grupo especie"
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
                                helperText="Especifique un nombre en ingles para el grupo especie"
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
                            <TextField
                                fullWidth
                                helperText="Especifique una descripción para el grupo especie"
                                label="Descripción"
                                margin="dense"
                                multiline
                                rowsMax="4"
                                name="descripcion"
                                onChange={this.handleChange}
                                required
                                value={this.state.descripcion}
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
                                helperText="Especifique una descripción en ingles para el grupo especie"
                                label="Description"
                                margin="dense"
                                multiline
                                rowsMax="4"
                                name="description"
                                onChange={this.handleChange}
                                required
                                value={this.state.description}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Imagen del grupoEspecie </Typography>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                type="file"
                                onChange={this.onChangeImg}
                                />
                                <label htmlFor="raised-button-file">
                                <Button variant="contained" color="default" component="span" >
                                    <CloudUploadIcon style={{marginRight: 10}}/>   
                                    Upload
                                </Button>
                                </label> 

                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <img style={{marginTop:10, maxWidth: 300, maxHeight: 200}} src={this.state.img} alt={this.state.nombre}/>
                            </Grid>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Visibilidad en la APP </Typography>
                            <FormControlLabel
                                control={
                                <Switch checked={this.state.activo} onChange={this.onChangeActivo} value="true" />
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
                        Guardar grupo especie
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

export default EditGrupoEspecies;