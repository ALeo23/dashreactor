import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import AuthService from '../utils/AuthService';

const auth = new AuthService('4ZP5XvMbVnvvU6hSpNT3togDmRzI7pHH', 'scripty-luke.auth0.com');

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'lessons'
    }
  }


  render() {
    const { navbarStyle, menuItemStyle, selectedStyle } = styles;

    return (
      <div style={navbarStyle}>
       {/* <h2 className="brand" style={brandStyle}>Dash Reactor</h2>*/}
        <img alt="dashReactorLogo" src='dashReactorLogo.png' style={{marginLeft: 10, marginTop: -90}}/>
        <i className="fa fa-book fa-2x" aria-hidden="true" style={{...menuItemStyle, ...selectedStyle}}></i>
        <br />

      {/*this 'users' option is not currently implemented - app is hard coded to open up lessons only.*/}
        <i className="fa fa-sign-out fa-2x" aria-hidden="true" style={menuItemStyle} onClick={auth.logout.bind(auth)}></i>
      </div>
    );
  }
}

const lightGrey = '#A3A8AB'
const darkGrey = '#777A7D'
const coral = '#FA848A'


const styles = {
  navbarStyle: {
    height: '100%',
    position: 'relative',
    paddingLeft: 5,
    paddingTop: 100,
    fontFamily: 'Lato',
    display: 'inline-block',
    verticalAlign: "top"
  },

  menuItemStyle: {
    color: lightGrey,
    marginTop: 25,
    cursor: 'pointer',
    opacity: 0.4,
    display:'block',
    paddingLeft:20,
    fontSize: 50,
  },

  selectedStyle: {
    color: coral,
    opacity: 1,
  }
}

export default Navbar;
