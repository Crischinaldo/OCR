import React, { Component } from 'react';
import './styles/App.css';
import Navigation from './navigation'
import Footer from './footer'
import {BrowserRouter} from 'react-router-dom'
import Header from './header';

class App extends Component {
constructor(props) {
  super(props);
  this.state = {
  };
}

render() {
    return (
        <div className='App'>
            <Header />
            <BrowserRouter>
                <Navigation />
            </BrowserRouter>
            
            <Footer />
        </div>
    );
}
}

export default App;