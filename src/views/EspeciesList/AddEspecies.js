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

  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';

import axios from 'axios';

class AddEspecies extends Component {

    state = {
        nombre: '',
        descripcion: '',
        description: '',
        genero: '',
        grupoEspecieId: '',
        grupoEspecies: [],
        img: '',
        tipo: '',
        type: '',
        images:[]
    }

    componentDidMount = () => {
        axios.get('http://vm.integralit.cl:13151/api/grupoEspecies')
            .then(res => {
                console.log(res);
                this.setState({
                    grupoEspecies: res.data.grupoEspecies
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

    onChangeImg = (e) => {

        const file = new FormData();
        file.append('archivo', e.target.files[0]);

        // this.setState({img:  URL.createObjectURL(e.target.files[0])});

        if(e.target.files[0]){

            axios.post('http://vm.integralit.cl:13151/api/upload/especies', file)
            .then(res => {
                this.setState({
                    img: "http://vm.integralit.cl:13151/uploads/especies/" + res.data.nombre
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
            grupoEspecie: this.state.grupoEspecieId,
            genero: this.state.genero,
            descripcion: this.state.descripcion,
            description: this.state.description,
            tipo: this.state.tipo,
            type: this.state.type,
            tinyImage: this.state.img,
            images: this.state.images
        };

        if(this.state.nombre && this.state.genero && this.state.tipo && this.state.type && this.state.descripcion && this.state.description && this.state.img){
            axios.post('http://vm.integralit.cl:13151/api/especies', data)
                .then(res => {
                    console.log(res);
                    this.props.adding();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    handleChangeGrupoEspecies = event => {
        this.setState({
            grupoEspecieId: event.target.value
        });
    };
    
    render() {
        return (
            <Card>
                <form
                    autoComplete="off"
                    noValidate
                >
                <CardHeader
                    subheader="complete los campos para agregar un nuevo especie"
                    title="Añadir un especie"
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
                                helperText="Especifique un nombre para la especie"
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
                                helperText="Especifique un genero para la especie"
                                label="Genero"
                                margin="dense"
                                multiline
                                rowsMax="4"
                                name="genero"
                                onChange={this.handleChange}
                                required
                                value={this.state.genero}
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
                                helperText="Especifique una descripción para la especie"
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
                                helperText="Especifique una descripción en ingles para la especie"
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
                            <TextField
                                fullWidth
                                helperText="Especifique un tipo para la especie"
                                label="Tipo"
                                margin="dense"
                                name="tipo"
                                onChange={this.handleChange}
                                required
                                value={this.state.tipo}
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
                                helperText="Especifique un tipo en ingles para la especie"
                                label="Type"
                                margin="dense"
                                name="type"
                                onChange={this.handleChange}
                                required
                                value={this.state.type}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Seleccione un Grupo</Typography>
                            <FormControl >
                                {/* <InputLabel htmlFor="age-simple">Seleccione un tipo de usario padre</InputLabel> */}
                                <Select
                                value={this.state.grupoEspecieId}
                                onChange={this.handleChangeGrupoEspecies}
                                inputProps={{
                                    name: 'grupoEspecies'
                                }}
                                >
                                    {this.state.grupoEspecies.map( tip => {
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
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Imagen del especie </Typography>
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
                                <img style={{marginTop:10, maxWidth:300+'px', maxHeight:400+'px'}} src={this.state.img} alt={this.state.nombre} />
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
                        Guardar especie
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

export default AddEspecies;