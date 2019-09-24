import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages, using code splitting to improve performance
// code splitting - splitting code into various parts. the entire app doesnt need
// to load right away, only parts the user is visiting

// React suspense allows to use a fallback method while rendering our components,
// until a condition is met
class App extends Component {

  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>

              <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} />

          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
