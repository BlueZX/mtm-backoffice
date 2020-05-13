import React, { Component } from 'react';

import { UsersToolbar, CapturaTable } from './components';
import { Button } from '@material-ui/core';
import axios from 'axios';
import { Typography } from '@material-ui/core';

import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class CapturaList extends Component {

  
  state = {
    init: [],
    capturas: []
  };
  
  getCapturas = () => {
    axios.get('http://vm.integralit.cl:13151/api/Captura/')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.Capturas,
          capturas: res.data.Capturas 
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  componentDidMount = () => {
    this.getCapturas();
  }

  onSearch = (event) => {
    console.log('buscvnado '+ event.target.value);

      let updatedList = this.state.init;

      updatedList = updatedList.filter((item) => {
        return (new Date(item.selectedDate).toLocaleDateString()).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({capturas: updatedList});
  }

  onSearch2 = (event) => {
    console.log('buscvnado '+ event.target.value);

      let updatedList = this.state.init;

      updatedList = updatedList.filter((item) => {
        return item.estado.nombre.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({capturas: updatedList});
  }

  onSearch3 = (event) => {
    console.log('buscvnado '+ event.target.value);

      let updatedList = this.state.init;

      updatedList = updatedList.filter((item) => {
        if(item.owner.nombre){
          return (item.owner.nombre + " "+ item.owner.apellidos).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        }
        else{
          return (item.owner.nick).toLowerCase().search(event.target.value.toLowerCase()) !== -1;
        }
      });
      this.setState({capturas: updatedList});
  }

  especiesSospechosasText = (esp) => {
    let text = "";
    esp.forEach( cap => text += cap.nombre + " , \n" );

    return text;
  }

  particulasText = (ml,esp) => {
    let text = "";

    if(ml !== undefined){
      for(let i=0;i<esp.length;i++){
        text += ml[i] + " ml de " + esp[i].nombre + ", \n";
      }
    }

    return text;
  }

  render() {

    return (
      <div>
        <div style={{margin:17, marginTop:10, marginBottom:10}}>
          <Typography variant="h5">Lista de capturas</Typography>
          <Typography variant="body1">En esta pantalla encontrarás información de las capturas hechas por los usuarios.</Typography>
        </div>
        {this.state.capturas.length === 0 ? (
          <div>
            <UsersToolbar onSearch={this.onSearch} onSearch2={this.onSearch2} onSearch3={this.onSearch3} />
            Sin resultados
          </div>
        ) : (
          <div>
            <UsersToolbar onSearch={this.onSearch} onSearch2={this.onSearch2} onSearch3={this.onSearch3} />
            <div style={{position: 'absolute', marginTop: -45, marginRight: 6 ,right: 0}}>
              <ExcelFile filename="Capturas" element={
                <Button
                  color="primary"
                  variant="contained"
                >
                  Exportar
                </Button>}>
                      <ExcelSheet data={this.state.capturas} name="Capturas">
                          <ExcelColumn label="Nombre" value={(col) => {return (col.owner.nombre ? col.owner.nombre + " " + col.owner.apellidos : col.owner.nick)}} />
                          <ExcelColumn label="Correo electronico" value={(col) => {return (col.owner.email ? col.owner.email : " - ")}} />
                          <ExcelColumn label="Edad" value={(col) => {return (col.owner.edad ? col.owner.edad : " - ")}} />
                          <ExcelColumn label="Coordenadas" value={(col) => {return (col.region.latitude.toFixed(2) + ", " + col.region.longitude.toFixed(2))}} />
                          <ExcelColumn label="Fecha en la que se tomo la captura" value={(col) => {return (new Date(col.selectedDate).toLocaleDateString() +"" )}} />
                          <ExcelColumn label="Estado de revisión" value={(col) => {return (col.estado.nombre + "" )}} />
                          <ExcelColumn label="Comentario" value={(col) => {return (col.comentario + "" )}} />
                          <ExcelColumn label="Particulas por ml" value={(col) => {return ( this.particulasText(col.celulasPorML, col.especiesSelected) )}} />
                          <ExcelColumn label="Especies sospechosas" value={(col) => {return ( this.especiesSospechosasText(col.especiesSelected) )}} />
                          <ExcelColumn label="Especies detectadas" value={(col) => {return ( this.especiesSospechosasText(col.especiesDetectadas) )}} />
                      </ExcelSheet>
              </ExcelFile>
            </div>
        <div>
          <CapturaTable capturas={this.state.capturas} getCapturas={this.getCapturas} />
        </div>
        </div>
        )}
      </div>
    );
  }
}

export default CapturaList;
