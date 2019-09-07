import React, { Component } from 'react';

import { UsersToolbar, TutorialTable } from './components';
import axios from 'axios';

class TutorialList extends Component {

  
  state = {
    tutoriales: []
  };
  
  getCapturas = () => {
    axios.get('http://vm.integralit.cl:13151/api/all/tutoriales')
      .then(res => {
        console.log(res.data);
        this.setState({tutoriales: res.data.tutoriales });
      });
  }
  componentDidMount = () => {
    this.getCapturas();
  }

  render() {

    return (
      <div>
        {this.state.tutoriales.length === 0 ? (
          <div>
            <UsersToolbar />
            Cargando ...
          </div>
        ) : (
          <div>
        <UsersToolbar />
        <div>
          <TutorialTable tutoriales={this.state.tutoriales} />
        </div>
        </div>
        )}
      </div>
    );
  }
}

export default TutorialList;
