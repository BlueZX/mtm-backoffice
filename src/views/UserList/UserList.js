import React, { Component } from 'react';

import { UsersToolbar, UsersTable } from './components';
import axios from 'axios';
import AddUser from './AddUser';

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
    init: [],
    usuarios: [],
    adding: false,
    activos: true,
  };
  
  getUser = () => {
    if(this.state.activos){
      axios.get('http://vm.integralit.cl:13151/api/usuario/')
        .then(res => {
          console.log(res.data);
          this.setState({
            init: res.data.usuarios,
            usuarios: res.data.usuarios 
          });

        });
    }
    else{
      axios.get('http://vm.integralit.cl:13151/api/all/usuario/')
        .then(res => {
          console.log(res.data);
          this.setState({
            init: res.data.usuarios,
            usuarios: res.data.usuarios 
          });

        });
    }
  }

  changeAdding = () => {
    this.setState({
      adding: !(this.state.adding)
    });
    this.getUser();
  }

  componentDidMount = () => {
    this.setState({
      activos: true
    });
    this.getUser();
  }

  changeActivos = (checked) => {
    this.setState({
      activos: checked
    });
    
    console.log(checked);
    if(checked){

      axios.get('http://vm.integralit.cl:13151/api/usuario')
      .then(res => {
        console.log(res.data);
        this.setState({
            init: res.data.usuarios,
            usuarios: res.data.usuarios 
        });
      })
      .catch(err => {
        console.log(err);
      });

    }else{
      axios.get('http://vm.integralit.cl:13151/api/all/usuario')
      .then(res => {
        console.log(res.data);
        this.setState({
          init: res.data.usuarios,
          usuarios: res.data.usuarios 
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
        return item.nick.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({usuarios: updatedList});
  }

  onSearch2 = (event) => {
    console.log('buscando '+ event.target.value);

      let updatedList = this.state.init;

      updatedList = updatedList.filter((item) => {
        return item.nombre.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({usuarios: updatedList});
  }

  onSearch3 = (event) => {
    console.log('buscando '+ event.target.value);

      let updatedList = this.state.init;

      updatedList = updatedList.filter((item) => {
        return item.email.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({usuarios: updatedList});
  }

  render() {
    //const classes = useStyles();

    return (
      <div>
        {this.state.usuarios.length === 0 ? (
          <div>
            <UsersToolbar adding={this.changeAdding} activos={this.changeActivos} onSearch={this.onSearch} onSearch3={this.onSearch3}/>
            Sin resultados
          </div>
        ) : (this.state.adding ? <AddUser adding={this.changeAdding} /> : (
          <div>
            <UsersToolbar adding={this.changeAdding} onSearch={this.onSearch} onSearch3={this.onSearch3} activos={this.changeActivos}/>
            <div>
              <UsersTable users={this.state.usuarios} getUsuarios={this.getUser} activos={this.state.activos} />
            </div>
          </div>
        ))}
      </div>
    );

    // return (
    //   <div>
    //     {this.state.usuarios.length === 0 ? (
    //       <div>
    //         <UsersToolbar />
    //         Cargando ...
    //       </div>
    //     ) : (
    //       <div>
    //     <UsersToolbar />
    //     <div>
    //       <UsersTable users={this.state.usuarios} />
    //     </div>
    //     </div>
    //     )}
    //   </div>
    // );
  }
}

export default UserList;
