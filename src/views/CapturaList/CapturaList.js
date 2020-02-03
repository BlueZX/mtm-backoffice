import React, { Component } from 'react';

import { UsersToolbar, CapturaTable } from './components';
import axios from 'axios';
import { Typography } from '@material-ui/core';

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
