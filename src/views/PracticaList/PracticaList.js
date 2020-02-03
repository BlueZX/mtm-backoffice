import React, { Component } from 'react';

import { UsersToolbar, PracticaTable } from './components';
import AddPractica from './addPractica';
import axios from 'axios';

class PracticaList extends Component {

  state = {
    init: [],
    practica: [],
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

      axios.get('http://vm.integralit.cl:13151/api/practica')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.practica ,
          practica: res.data.practica 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/practica')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.practica ,
          practica: res.data.practica 
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  
  
  getCapturas = () => {
    if(this.state.activos){

      axios.get('http://vm.integralit.cl:13151/api/practica')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.practica ,
          practica: res.data.practica 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/practica')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.practica ,
          practica: res.data.practica 
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
      this.setState({practica: updatedList});
  }

  render() {

    if(this.state.adding){
      return (<AddPractica adding={this.changeAdding} />);
    }else{
      return (
        <div>
          {this.state.practica.length === 0 ? 
          <div>
            <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} onSearch={this.onSearch}/>
            Sin resultados
          </div> : 
          <div>
            <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} onSearch={this.onSearch}/>
            <div>
              <PracticaTable practica={this.state.practica} getCapturas={this.getCapturas} activos={this.state.activos} />
            </div>
          </div>}
        </div>);
    }
    
  }
}

export default PracticaList;
