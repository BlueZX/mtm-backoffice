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

  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';

import axios from 'axios';

class EditTutorial extends Component {

    state = {
        id: '',
        nombre: '',
        descripcion: '',
        genero: '',
        ge: {},
        grupoEspecies: [],
        grupoEspecieId: '',
        tinyImage: '',
        images: [],
        tipo: '',
        activo: true,


        
    }

    componentDidMount = () => {
        this.setState({
            id : this.props.especie._id,
            nombre: this.props.especie.nombre,
            descripcion: this.props.especie.descripcion,
            genero: this.props.especie.genero,
            ge: this.props.especie.grupoEspecie,
            grupoEspecieId: this.props.especie.grupoEspecie._id,
            tinyImage: this.props.especie.tinyImage,
            images: this.props.especie.images,
            tipo: this.props.especie.tipo,
            activo: this.props.especie.activo
        });

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

    handleChangeGrupoEspecies = event => {
        this.setState({
            grupoEspecieId: event.target.value
        });
    };

    onChangeActivo = () => {
        this.setState({
            activo: !this.state.activo
        });
    }

    onSubmit = () => {
        let data = {

            id : this.state._id,
            nombre: this.state.nombre,
            descripcion: this.state.descripcion,
            genero: this.state.genero,
            grupoEspecie: this.state.grupoEspecieId,
            tinyImage: this.state.tinyImage,
            images: this.state.images,
            tipo: this.state.tipo,
            activo: this.state.activo

        };

        if(this.state.nombre && this.state.descripcion && this.state.genero && this.state.grupoEspecie && this.state.tipo && this.state.tinyImage ){
            axios.put('http://vm.integralit.cl:13151/api/especies/'+this.state.id, data)
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
                    subheader="complete los campos para modificar la especie"
                    title="Modificando especie"
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
                                helperText="Especifique un tipo para la especie"
                                label="Tipo *"
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
                            <Typography variant="subtitle1" style={{marginBottom: 10}}>Imagen de la especie </Typography>
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
                                <img style={{marginTop:10, maxWidth: 300, maxHeight: 200}} src={this.state.tinyImage} alt={this.state.nombre}/>
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
                        Guardar especie
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