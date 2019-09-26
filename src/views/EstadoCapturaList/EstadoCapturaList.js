import React, { Component } from 'react';

import { UsersToolbar, EstadoCapturaTable } from './components';
import AddEstadoCaptura from './addEstadoCaptura';
import axios from 'axios';

class EstadoCapturaList extends Component {

  
  state = {
    tutoriales: [],
    adding: false,
    activos: true,
  };

  componentDidMount = () => {
    this.setState({
      activos: true
    });
    this.getCapturas();
  }


  changeAdding = () => {
    this.setState({
      adding: !(this.state.adding)
    });
    this.getCapturas();
  }

  changeActivos = (checked) => {
    this.setState({
      activos: checked
    });
    
    console.log(checked);
    if(checked){

      axios.get('http://vm.integralit.cl:13151/api/EstadoCaptura')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.estadoCaptura });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/EstadoCaptura')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.estadoCaptura });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  
  
  getCapturas = () => {
    if(this.state.activos){

      axios.get('http://vm.integralit.cl:13151/api/EstadoCaptura')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.estadoCaptura });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/EstadoCaptura')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.estadoCaptura });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  render() {

    return (
      <div>
        {this.state.tutoriales.length === 0 ? (
          <div>
            <UsersToolbar />
            Cargando ...
          </div>
        ) : (this.state.adding ? <AddEstadoCaptura adding={this.changeAdding} /> : (
          <div>
            <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} />
            <div>
              <EstadoCapturaTable tutoriales={this.state.tutoriales} getCapturas={this.getCapturas} activos={this.state.activos} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default EstadoCapturaList;
