import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import AdminPanel from './components/Admin/AdminPanel';
import UserPanel from './components/User/UserPanel';
import MovieShowHall from './components/User/MovieShowHall';

function Application() {

  

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <UserPanel />
        </Route>
        <Route path="/admin" exact>
          <AdminPanel />
        </Route>
        <Route path="/hall/:id" component={MovieShowHall} exact/>
        {/* <Route path="/hall/:id" exact> */}
          {/* <MovieShowHall /> */}
        {/* </Route> */}
      </Switch>
    </Router>


  );
}

export default Application;
