import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Allhands from "./components/Allhands/Allhands";
import './app.css'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Addhands from "./components/Addhands/Addhands"

function App() {

  return (
    <Router>
      <Navbar/>
      <div class='container'>
        <Sidebar/>
        <div class='maincomponent'>
          <Switch>
            <Route path="/allhands">
              <Allhands/>
            </Route>
            <Route path="/addhands">
              <Addhands/>
            </Route>
          </Switch>
        </div>
      </div>
      
    </Router>
  );
}

export default App;
