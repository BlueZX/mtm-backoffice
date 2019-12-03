import React, { Component } from 'react';

import { UsersToolbar, EspeciesTable } from './components';
import AddEspecies from './AddEspecies';
import axios from 'axios';

class EspeciesList extends Component {

  
  state = {
    init: [],
    especies: [],
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

      axios.get('http://vm.integralit.cl:13151/api/especies')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.especies ,
          especies: res.data.especies 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/especies')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.especies ,
          especies: res.data.especies 
        });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  
  
  getCapturas = () => {
    if(this.state.activos){

      axios.get('http://vm.integralit.cl:13151/api/especies')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.especies ,
          especies: res.data.especies 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/especies')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.especies ,
          especies: res.data.especies 
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
      this.setState({especies: updatedList});
  }

  render() {

    return (
      <div>
        {this.state.especies.length === 0 ? (
          <div>
            {this.state.adding ? <AddEspecies adding={this.changeAdding} /> : 
            (<div>
              <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} onSearch={this.onSearch}/>

              Sin resultados
            </div>)}
          </div>
        ) : (this.state.adding ? <AddEspecies adding={this.changeAdding} /> : (
          <div>
            <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} onSearch={this.onSearch}/>
            <div>
              <EspeciesTable especies={this.state.especies} getCapturas={this.getCapturas} activos={this.state.activos} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default EspeciesList;
