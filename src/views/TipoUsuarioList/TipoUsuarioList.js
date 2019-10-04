import React, { Component } from 'react';

import { UsersToolbar, TipoUsuarioTable } from './components';
import AddTipoUsuario from './addTipoUsuario';
import axios from 'axios';

class TipoUsuarioList extends Component {

  
  state = {
    init: [],
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

      axios.get('http://vm.integralit.cl:13151/api/tipoUsuario')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.tipoUsuarios ,
          tutoriales: res.data.tipoUsuarios 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/tipoUsuario')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.tipoUsuarios ,
          tutoriales: res.data.tipoUsuarios 
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  
  
  getCapturas = () => {
    if(this.state.activos){

      axios.get('http://vm.integralit.cl:13151/api/tipoUsuario')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.tipoUsuarios ,
          tutoriales: res.data.tipoUsuarios 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/tipoUsuario')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.tipoUsuarios ,
          tutoriales: res.data.tipoUsuarios 
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  onSearch = (event) => {
    console.log('buscvnado '+ event.target.value);

      let updatedList = this.state.init;

      updatedList = updatedList.filter((item) => {
        return item.nombre.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({tutoriales: updatedList});
  }

  render() {

    return (
      <div>
        {this.state.tutoriales.length === 0 ? (
          <div>
            <UsersToolbar  onSearch={this.onSearch}/>
            Sin resultados
          </div>
        ) : (this.state.adding ? <AddTipoUsuario adding={this.changeAdding} /> : (
          <div>
            <UsersToolbar adding={this.changeAdding} activos={this.changeActivos}  onSearch={this.onSearch}/>
            <div>
              <TipoUsuarioTable tutoriales={this.state.tutoriales} getCapturas={this.getCapturas} activos={this.state.activos} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default TipoUsuarioList;
