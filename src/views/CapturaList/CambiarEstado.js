import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    Typography,
  } from '@material-ui/core';
import ModalImage from "react-modal-image";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';

import axios from 'axios';

class CambiarEstado extends Component {

    state = {
        id: '',
        especiesSospechosa: [],
        especiesDetectadas: [],
        coordenadas: '',
        img: [],
        estadoCaptura: '',
        estadoCapturaId: '',
        activo: true,
        estados: [],
        especies: [],
        especiesCheck:[]
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
            especiesDetectadas: this.props.captura.especiesDetectadas,
            coordenadas: this.props.captura.region.latitude,
            estadoCaptura: this.props.captura.estado.nombre,
            estadoCapturaId: this.props.captura.estado._id,
            img: this.props.captura.filePath,
            activo: this.props.captura.activo,
        });

        axios.get('http://vm.integralit.cl:13151/api/especies')
            .then(res => {
                console.log(res.data);
                // this.setState({especies: res.data.especies});

                let selec = [];

                res.data.especies.map(esp => {
                    let nombre = esp.genero + ' ' + esp.nombre;
                    let estado = false;

                    this.state.especiesDetectadas.find( (elem)  => {
                        if(elem.id === esp._id){
                            estado = true;
                        }
                        return elem.id === esp._id;
                    });

                    this.state.especiesDetectadas.findIndex(x => x.id === esp._id);
                    let id = esp._id;
                    let ess = {id, nombre, estado};
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

    handleChangeState = event => {
        this.setState({
          estadoCapturaId: event.target.value
        });
    };

    onSubmit = () => {
        let selec = [];

        this.state.especies.map( esp => {
            if(esp.estado){
                let nombre = esp.nombre;
                let id = esp.id;
                let ess = { nombre, id };
                selec.push(ess);
            }
            return '';
        });

        let data = {
            estado: this.state.estadoCapturaId,
            especiesDetectadas: selec
        };

        console.log(this.state.id + " id ");

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

    handleChangeCheck = especie => event => {
        this.setState({});

        //estado previo react en un array
        this.setState(prevState => ({
            especies: prevState.especies.map(
              es => es.id === especie.id? { ...es, estado: !especie.estado }: es
            )
          
        }))
        // if(event.target.checked){
        //     console.log('pase');
        //     let especiesSel = this.state.especiesDetectadas;
        //     let nombre =  especie.genero + ' ' + especie.nombre;
        //     especiesSel.push(especie._id, nombre , especie.especiesCount);
        //     this.setState({ especiesDetectadas: especiesSel });

        // }
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
                                style={{marginTop:10, maxWidth: 300, maxHeight: 200}}
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
                                    name: 'estados'
                                }}
                                >
                                    {this.state.estados.map( est => {
                                        return <MenuItem key={est._id} value={est._id}>{est.nombre}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                            <Typography variant="subtitle1" style={{marginTop: 20, marginBottom: 10}}>Especies sospechosas</Typography>
                            {this.state.especiesSospechosa.map( esp => {
                                return <Typography key={esp.especieId} variant="body1">{(esp.nombre || esp.especieId) + ", "}</Typography>
                            })}

                            <Typography variant="subtitle1" style={{marginTop: 20, marginBottom: 10}}>Seleccione las especies detectadas</Typography>
                            <FormControl>
                                <FormGroup>
                                    {this.state.especies.map( esp => {
                                        return <FormControlLabel key={esp.id} control={<Checkbox checked={esp.estado} onChange={this.handleChangeCheck(esp)} value={ esp.estado} />} label={esp.nombre} />
                                    })}
                                </FormGroup>
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