import React, { Component } from 'react';

import { UsersToolbar, GrupoEspeciesTable } from './components';
import AddGrupoEspecies from './AddGrupoEspecies';
import axios from 'axios';

class GrupoEspeciesList extends Component {

  
  state = {
    init: [],
    grupoEspecies: [],
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

      axios.get('http://vm.integralit.cl:13151/api/grupoEspecies')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.grupoEspecies ,
          grupoEspecies: res.data.grupoEspecies 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/grupoEspecies')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.grupoEspecies ,
          grupoEspecies: res.data.grupoEspecies 
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  
  
  getCapturas = () => {
    if(this.state.activos){

      axios.get('http://vm.integralit.cl:13151/api/grupoEspecies')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.grupoEspecies ,
          grupoEspecies: res.data.grupoEspecies 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/grupoEspecies')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.grupoEspecies ,
          grupoEspecies: res.data.grupoEspecies 
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }

  onSearch = (event) => {
    console.log('buscando '+ event.target.value);

      let updatedList = this.state.init;

      updatedList = updatedList.filter((item) => {
        return item.nombre.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({grupoEspecies: updatedList});
  }

  render() {

    return (
      <div>
        {this.state.grupoEspecies.length === 0 ? (
          <div>
            {this.state.adding ? <AddGrupoEspecies adding={this.changeAdding} /> : 
            (<div>
              <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} onSearch={this.onSearch}/>

              Sin resultados
        </div>)}
          </div>
        ) : (this.state.adding ? <AddGrupoEspecies adding={this.changeAdding} /> : (
          <div>
            <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} onSearch={this.onSearch}/>
            <div>
              <GrupoEspeciesTable grupoEspecies={this.state.grupoEspecies} getCapturas={this.getCapturas} activos={this.state.activos} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default GrupoEspeciesList;
