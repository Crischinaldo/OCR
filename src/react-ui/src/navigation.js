import React, { Component } from 'react';
import './styles/navigation.css';
import Home from './home';
import Dashboard from './dashboard';
import {Navbar, Nav} from 'react-bootstrap';
import { Route, NavLink } from 'react-router-dom';
class Navigation extends Component {

  render() {
    return (
        <div className="App-navigation">
            <div className="App-nav-overlay">
            <div className="App-nav-wrapper">
                <div className="App-nav-bar">
                <Navbar collapseOnSelect expand="lg" className='App-navbar'>

                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavLink href="/"
                                 to="/home"
                                 className="nav_link"
                                 activeClassName="activeRoute"
                                 activeStyle={{ color: 'white' }}
                        >Home
                        </NavLink>
                        <NavLink href="/dashboard"
                                 to="/dashboard"
                                 className="nav_link"
                                 activeClassName="activeRoute"
                                 activeStyle={{ color: 'white'}}
                        >Dashboard
                        </NavLink>
                    </Nav>
                    </Navbar.Collapse>
                </Navbar>
                </div>
            </div>
            </div>
            <div className="App-content">
                <Route exact path="/home" component={Home} />
                <Route exact path="/dashboard" component={Dashboard} />
            </div>

        </div>
    );
  }
}

export default Navigation;