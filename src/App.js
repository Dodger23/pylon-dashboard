import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Malfunctions from "./components/Malfunctions";
import MonthlyReadings from "./components/MonthlyReadings";
import WaterConstracts from "./components/WaterContracts";
import Responses from "./components/Responses";
import ConnectedMeters from "./components/ConnectedMeters";

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
            <footer>Tarek Hassan</footer>
          </Route>
          
          <Route path='/water-contracts'>
            <div className="layout-container">
              <Sidebar current='water-contracts'/>
              <div className='main-content'>
                  <WaterConstracts />
              </div>
            </div>
            <footer>Tarek Hassan</footer>
          </Route>
          
          <Route path='/malfunctions'>
            <div className="layout-container">
              <Sidebar current='malfunctions'/>
              <div className='main-content'>
                <Malfunctions />
              </div>
            </div>
            <footer>Tarek Hassan</footer>
          </Route>
          
          <Route path='/responses'>
            <div className="layout-container">
              <Sidebar current='responses'/>
              <div className='main-content'>
                <div style={{height: '100%'}}>
                  <Responses />
                </div>
              </div>
            </div>
            <footer>Tarek Hassan</footer>
          </Route>
          
          <Route path='/monthly-readings'>
            <div className="layout-container">
              <Sidebar current='monthly-readings'/>
              <div className='main-content'>
                <MonthlyReadings />
              </div>
            </div>
            <footer>Tarek Hassan</footer>
          </Route>
          
          <Route path='/connected-meters'>
            <div className="layout-container">
              <Sidebar current='connected-meters'/>
              <div className='main-content'>
                <ConnectedMeters />
              </div>
            </div>
            <footer>Tarek Hassan</footer>
          </Route>
          
        </Switch>
      </Router>
    </div>
  );
}

export default App;
