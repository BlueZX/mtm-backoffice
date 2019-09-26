import React, { Component } from 'react';

import { UsersToolbar, UsersTable } from './components';
import axios from 'axios';

/*
const UserList = () => {
  const classes = useStyles();
  //const [users] = useState(mockData);
  //const [users] = useState(getUser());
  const users = getUser();
  console.log(users);

  // axios.get('http://vm.integralit.cl:13151/api/usuario/')
  // .then(res => {
  //   console.log(res);
  //   [users].push(res.data.usuarios);
  // });

  

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={users} />
      </div>
    </div>
  );
};
*/

class UserList extends Component {

  
  state = {
    usuarios: []
  };
  
  getUser = () => {
    axios.get('http://vm.integralit.cl:13151/api/usuario/')
      .then(res => {
        console.log(res.data);
        this.setState({usuarios: res.data.usuarios });
      });
  }
  componentDidMount = () => {
    this.getUser();
  }

  render() {
    //const classes = useStyles();

    return (
      <div>
        {this.state.usuarios.length === 0 ? (
          <div>
            <UsersToolbar />
            Cargando ...
          </div>
        ) : (
          <div>
        <UsersToolbar />
        <div>
          <UsersTable users={this.state.usuarios} />
        </div>
        </div>
        )}
      </div>
    );
  }
}

export default UserList;
