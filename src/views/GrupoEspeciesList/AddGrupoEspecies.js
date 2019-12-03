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
    Typography
  } from '@material-ui/core';

import axios from 'axios';

class AddGrupoEspecies extends Component {

    state = {
        nombre: '',
        descripcion: '',
        img: ''
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

    onSubmit = () => {
        let data = {
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,
            images: this.state.img
        };

        if(this.state.nombre && this.state.descripcion && this.state.img){
            axios.post('http://vm.integralit.cl:13151/api/grupoEspecies', data)
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
                    subheader="complete los campos para agregar un nuevo grupoEspecie"
                    title="Añadir un grupoEspecies"
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
                                helperText="Especifique un nombre para el grupoEspecie"
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
                                helperText="Especifique una descripción para el grupoEspecie"
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
                                <img style={{marginTop:10,maxWidth:300+'px',maxHeight:400+'px'}} src={this.state.img} alt={this.state.nombre} />
                            </Grid>
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
                        Guardar grupoEspecie
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

export default AddGrupoEspecies;