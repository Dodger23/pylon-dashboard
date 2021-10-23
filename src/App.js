import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Malfunctions from "./components/Malfunctions";
import MonthlyReadings from "./components/MonthlyReadings";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Switch>
          <Route exact path='/'>
            <div className="layout-container">
              <Sidebar current='home'/>
              <Home />
            </div>
          </Route>
          
          <Route path='/water-contracts'>
            <div className="layout-container">
              <Sidebar current='water-contracts'/>
              <div></div>
            </div>
          </Route>
          
          <Route path='/malfunctions'>
            <div className="layout-container">
              <Sidebar current='malfunctions'/>
              <div className='main-content'>
                <Malfunctions />
              </div>
            </div>
          </Route>
          
          <Route path='/responses'>
            <div className="layout-container">
              <Sidebar current='responses'/>
              <div></div>
            </div>
          </Route>
          
          <Route path='/monthly-readings'>
            <div className="layout-container">
              <Sidebar current='monthly-readings'/>
              <div className='main-content'>
                <MonthlyReadings />
              </div>
            </div>
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
