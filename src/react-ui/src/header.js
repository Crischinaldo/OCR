import React, { Component } from 'react';
// import logo from "./styles/resources/logo.svg";
import './styles/header.css';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

  render() {
    return (
        <div className="App-header">
            <div className="App-logo"/>​
            <div className="social-link">
                <a href="https://github.com/crischinaldo" className="git-mark"/>
            </div>
        </div>

    );
  }
}

export default Header;