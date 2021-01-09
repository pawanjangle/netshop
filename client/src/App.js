import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import NavbarComponent from "./components/NavbarComponent";
import Sidebar from "./components/Sidebar";
function App() {
  return (
    <Router>
      <div className="App">    
          <div className="row">                
            <div className="col-sm-10">
              <NavbarComponent />
              <div className="col-sm-2"><Sidebar/>
            </div>     
            </div>
          </div>       
      </div>
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
