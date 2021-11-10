import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Allhands from "./components/Allhands/Allhands";
import './app.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Addhands from "./components/Addhands/Addhands"
import EditHand from "./components/EditHand/EditHand";
import { useState } from 'react';

function App() {

  const [ElObjetoSelecto, setObjetoSelecto] = useState({})


  return (
    <Router>
      
      <Navbar/>
      <div class='container'>
        <Sidebar/>
        <div class='maincomponent'>
          <Switch>
            <Route path="/allhands">
              <Allhands setObjetoSelecto={setObjetoSelecto} />
            </Route>
            <Route path="/addhands">
              <Addhands/>
            </Route>
            <Route path="/edithand">
              <EditHand ElObjetoSelecto={ElObjetoSelecto}/>
            </Route>
          </Switch>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
