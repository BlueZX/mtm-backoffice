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

class EditTutorial extends Component {

    state = {
        id: '',
        nombre: '',
        descripcion: '',
        videoId: '',
        duracion: '',
        img: '',
        activo: true,
    }

    componentDidMount = () => {
        this.setState({
            id : this.props.tutorial._id,
            nombre: this.props.tutorial.nombre,
            descripcion: this.props.tutorial.descripcion,
            videoId: this.props.tutorial.videoId,
            duracion: this.props.tutorial.duracion,
            img: this.props.tutorial.link,
            activo: this.props.tutorial.activo
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

            axios.post('http://vm.integralit.cl:13151/api/upload/tutoriales', file)
            .then(res => {
                this.setState({
                    img: "http://vm.integralit.cl:13151/uploads/tutoriales/" + res.data.nombre
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
            descripcion: this.state.descripcion,
            videoId: this.state.videoId,
            duracion: this.state.duracion,
            link: this.state.img,
            activo: this.state.activo
        };

        if(this.state.nombre && this.state.descripcion && this.state.videoId && this.state.duracion && this.state.img){
            axios.put('http://vm.integralit.cl:13151/api/tutoriales/'+this.state.id, data)
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
                    subheader="complete los campos para modificar el tutorial"
                    title="Modificando tutorial"
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
                                helperText="Especifique un titulo para el tutorial"
                                label="Titulo"
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
                                helperText="Especifique una descripción para el tutorial"
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
                                helperText="Especifique un Video URL para el tutorial"
                                label="Video URL"
                                margin="dense"
                                name="videoId"
                                onChange={this.handleChange}
                                required
                                value={this.state.videoId}
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
                                helperText="Especifique una duración del video"
                                label="Duración del video"
                                margin="dense"
                                name="duracion"
                                onChange={this.handleChange}
                                required
                                value={this.state.duracion}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Imagen del tutorial </Typography>
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
                        Guardar tutorial
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

export default EditTutorial;