import React from 'react';
import "./styles.css"
import { Link,  withRouter } from "react-router-dom";
import swal from 'sweetalert';
import { logout } from "../../../services/auth";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // user: JSON.parse(localStorage.getItem('@vacine/authUser'))
      user: {
        name:"John Doe",
        avatar:"https://png.pngtree.com/png-vector/20190225/ourlarge/pngtree-vector-avatar-icon-png-image_702369.jpg",
        role:{
          id:1,
          description:"admin"
        }
      }
    }
  }

  async handleLogout() {
    const leave = await swal({
      title: "Tem certeza que deseja sair?",
      text: "Verifique se todas as mudanças foram salvas antes de sair.",
      icon: "warning",
      dangerMode: true,
    });
    if (leave) {
      logout()
      localStorage.clear();
      this.props.history.push("/");
    }
  }

  render() {
    const  user  = this.state.user;
    return (
      <div className="main-header">
        <div className="topnav" id="myTopnav">
          <a href="# " id="menu-icon" className="menu-icon" onClick={this.openNav}>&#9776;</a>
          <div className="dropdown">
              <button className="dropbtn">
              <img className="img-profile" src={this.state.user.avatar} alt="Profile"></img>
                {/* <i className="fa fa-caret-down"></i> */}
              </button>
              <div className="dropdown-content">
                  <div className="div-profile">
                    <img className="nav-photo" src={this.state.user.avatar} alt="Profile"></img>
                    <p className="color-title"><b>{user.name}</b></p>
                  </div>
                  <Link className="color-title style-p" to="/settings">Configurações</Link>
                  <Link className="color-title style-p"  onClick={()=>this.handleLogout()} to="#">Sair</Link>
              </div>
          </div>
        </div>
        <div id="mySidenav" className="sidenav">
          <a className="logo" href="/home"><span>DigiVacina</span></a>
          <a href="# " id="closebtn" className="closebtn" onClick={this.closeNav}>&#9776;</a>
          <div className="sidenav-content">
            <Link className="color-title-content" to="/home"><span role="img" aria-label="sheep" className="sidenav-icon fa fa-home"></span>Início</Link>
            <Link className="color-title-content" to="/pending"><span role="img" aria-label="sheep" className="sidenav-icon fa fa-clock-o" aria-hidden="true"></span>Pendentes</Link>
            <Link className="color-title-content" to="/administered"><span role="img" aria-label="sheep" className="sidenav-icon fa fa-check-circle-o" aria-hidden="true"></span>Administradas</Link>
            <Link className="color-title-content" to="/settings"><span role="img" aria-label="sheep" className="sidenav-icon fa fa-cog"></span>Configurações</Link>
          </div>
        </div>
      </div>
    );
  }

openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  if (window.innerWidth < 700 || window.innerHeight < 600) {
    // versão pra celular
  } else {
    document.getElementById("main").style.marginLeft = "250px";
  }
  document.getElementById("menu-icon").style.display = "none";
  document.getElementById("closebtn").style.display = "block";
}

closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  if (window.innerWidth < 700 || window.innerHeight < 600) {
    // versão pra celular
  } else {
    document.getElementById("main").style.marginLeft= "0";
  }
  document.getElementById("menu-icon").style.display = "block";
  document.getElementById("closebtn").style.display = "none";
}
}


export default withRouter (Header);