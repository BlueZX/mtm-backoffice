import React, { Component } from 'react';

import { UsersToolbar, TutorialTable } from './components';
import AddTutorial from './addTutorial';
import axios from 'axios';

class TutorialList extends Component {

  
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

      axios.get('http://vm.integralit.cl:13151/api/tutoriales')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.tutoriales });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/tutoriales')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.tutoriales });
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  
  
  getCapturas = () => {
    if(this.state.activos){

      axios.get('http://vm.integralit.cl:13151/api/tutoriales')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.tutoriales });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/tutoriales')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.tutoriales });
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
        ) : (this.state.adding ? <AddTutorial adding={this.changeAdding} /> : (
          <div>
            <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} />
            <div>
              <TutorialTable tutoriales={this.state.tutoriales} getCapturas={this.getCapturas} activos={this.state.activos} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default TutorialList;
