import React, { Component } from 'react';

import { UsersToolbar, CapturaTable } from './components';
import axios from 'axios';

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
        return item.selectedDate.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({capturas: updatedList});
  }

  render() {

    return (
      <div>
        {this.state.capturas.length === 0 ? (
          <div>
            <UsersToolbar onSearch={this.onSearch}/>
            Sin resultados
          </div>
        ) : (
          <div>
        <UsersToolbar onSearch={this.onSearch} />
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
