import React, { Component } from 'react';

import { UsersToolbar, CapturaTable } from './components';
import axios from 'axios';

class CapturaList extends Component {

  
  state = {
    capturas: []
  };
  
  getCapturas = () => {
    axios.get('http://vm.integralit.cl:13151/api/Captura/')
      .then(res => {
        console.log(res.data);
        this.setState({capturas: res.data.Capturas });
      });
  }
  componentDidMount = () => {
    this.getCapturas();
  }

  render() {

    return (
      <div>
        {this.state.capturas.length === 0 ? (
          <div>
            <UsersToolbar />
            Cargando ...
          </div>
        ) : (
          <div>
        <UsersToolbar />
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
