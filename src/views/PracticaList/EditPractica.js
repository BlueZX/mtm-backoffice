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
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Switch
  } from '@material-ui/core';
  import FormControl from '@material-ui/core/FormControl';
  import FormGroup from '@material-ui/core/FormGroup';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import Checkbox from '@material-ui/core/Checkbox';

import axios from 'axios';

class EditPractica extends Component {

    state = {
        id: '',
        activo: true,
        especiesSelected: [],
        especies:[],
        especiesCount: "0",
        images: '',
        nombreEspecie: "",
        especie: {},
        openDialog: false
    }

    componentDidMount = () => {

        this.setState({
            id : this.props.practica._id,
            images: this.props.practica.images,
            especiesSelected: this.props.practica.especiesSelected,
            activo: this.props.practica.activo
        });

        axios.get('http://vm.integralit.cl:13151/api/especies')
            .then(res => {
                console.log(res.data);
                // this.setState({especies: res.data.especies});

                let selec = [];

                res.data.especies.map(esp => {
                    let nombre = esp.genero + ' ' + esp.nombre;
                    let estado = false;
                    let especiesCount = 0;

                    this.state.especiesSelected.find( (elem)  => {
                        if(elem.id === esp._id){
                            estado = true;
                        }
                        return elem.id === esp._id;
                    });

                    this.state.especiesSelected.findIndex(x => x.id === esp._id);
                    let id = esp._id;
                    let ess = {id, nombre, estado, especiesCount};
                    selec.push(ess);
                    return '';
                });
                console.log(selec);

                this.setState({especies: selec});
                // console.log(this.especies);
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

    
    handleChangeCheck = especie => event => {

        console.log(especie);

        if(!especie.estado){
            let id = especie.id;
            let nombre = especie.nombre;
            let estado = !especie.estado;
            let especiesCount = 0;
            
            let es = {id,nombre,estado,especiesCount};
            this.setState({especie: es});
            this.handleClickOpen();
        }
        else{
            let selec = [];
            this.state.especiesSelected.map(esp => {

                if(esp.id === especie.id){
                    console.log("filttrado");
                }
                else{
                    selec.push(esp);
                }
            });    
            console.log(selec);
            this.setState({especiesSelected:selec});
        }
        
        //estado previo react en un array
        this.setState(prevState => ({
            especies: prevState.especies.map(
              es => es.id === especie.id? { ...es, estado: !especie.estado }: es
            )
          
        }))
        
    }

    handleClickOpen = () => {
        this.setState({ openDialog:true});
    };
    
    handleClose = () => {
        this.setState({ openDialog:false});
    };

    handleSaveCount = () => {
        console.log(this.state.especie);
        console.log(this.state.especiesCount);

        let selec = this.state.especiesSelected;

        let id = this.state.especie.id;
        let nombre = this.state.especie.nombre;
        let estado = this.state.especie.estado;
        let especiesCount = this.state.especiesCount;
            
        let es = {id,nombre,estado,especiesCount};
        selec.push(es);
        this.setState({especie: {}, especiesSelected:selec});

        console.log(this.state.especie);
        console.log(this.state.especiesSelected);
        this.handleClose();
    }

    onChangeImg = (e) => {

        const file = new FormData();
        file.append('archivo', e.target.files[0]);

        // this.setState({img:  URL.createObjectURL(e.target.files[0])});

        if(e.target.files[0]){

            axios.post('http://vm.integralit.cl:13151/api/upload/practica', file)
            .then(res => {
                this.setState({
                    images: "http://vm.integralit.cl:13151/uploads/practica/" + res.data.nombre
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
            especiesSelected: this.state.especiesSelected,
            images: this.state.images,
            activo: this.state.activo
        };

        if(this.state.especiesSelected && this.state.images){
            axios.put('http://vm.integralit.cl:13151/api/practica/'+this.state.id, data)
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
            <div>
            <Card>
                <form
                    autoComplete="off"
                    noValidate
                >
                <CardHeader
                    subheader="complete los campos para modificar la practica"
                    title="Modificando practica"
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
                                <Typography variant="subtitle1" style={{marginBottom: 10}}>Imagen del practica </Typography>
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
                                    <img style={{marginTop:10, maxHeight:500,maxWidth:400}} src={this.state.images} alt={this.state.nombre} />
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                {/* <Typography variant="subtitle1" style={{marginTop: 20, marginBottom: 10}}>Especies sospechosas</Typography>
                                {this.state.especiesSospechosa.map( esp => {
                                    return <Typography key={esp.especieId} variant="body1">{(esp.nombre || esp.especieId) + ", "}</Typography>
                                })} */}

                                <Typography variant="subtitle1" style={{marginTop: 20, marginBottom: 10}}>Seleccione las especies que estan en la imagen</Typography>
                                <FormControl>
                                    <FormGroup>
                                        {this.state.especies.map( esp => {
                                            return <FormControlLabel key={esp.id} control={<Checkbox checked={esp.estado} onChange={this.handleChangeCheck(esp)} value={ esp.estado} />} label={esp.nombre} />
                                        })}
                                    </FormGroup>
                                </FormControl>
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


            <Dialog open={this.state.openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Cuantos elementos hay</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="especiesCount"
                        label="Cantidad de esta especie"
                        type="number"
                        onChange={this.handleChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSaveCount} color="primary">
                        guardar
                    </Button>
                </DialogActions>
            </Dialog>
            </div>
        );
    }
}

export default EditPractica;