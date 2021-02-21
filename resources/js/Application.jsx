import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import AdminPanel from './components/Admin/AdminPanel';
import UserPanel from './components/User/UserPanel';
import Payment from './components/User/Payment';
import Ticket from './components/User/Ticket';
import MovieShowHall from './components/User/MovieShowHall';
import UserContext from './components/User/UserContext';
import UserProvider from './components/User/UserProvider';

function Application() {

  

  return (
    <Router>
      <UserProvider>
      <Switch>
        <Route path="/" exact>
          <UserPanel />
        </Route>
        <Route path="/admin" exact>
          <AdminPanel />
        </Route>
        <Route path="/hall/:id" component={MovieShowHall} exact/>
        <Route path="/payment" component={Payment} exact />
        <Route path="/ticket/:id" component={Ticket} exact />
        {/* <Route path="/hall/:id" exact> */}
          {/* <MovieShowHall /> */}
        {/* </Route> */}
      </Switch>
      </UserProvider>
    </Router>


  );
}

export default Application;
