import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import Events from './Pages/Events';
import SingleEvent from './Pages/SingleEvent';
import Competitions from './Pages/Competitions';
import SingleModel from './Pages/SingleModel';

function App() {
  return (
    <Router>
          <div className="main-container">          
              <Routes>
                  <Route path="/" element={<Home />}/> 
                  <Route path="/miss-south-africa" element={<Events />}/> 
                  <Route path="/event/:id" element={<SingleEvent />}/>                   
                  <Route path="/competitions" element={<Competitions />}/> 
                  <Route path="/modal/:id" element={<SingleModel />}/>  
              </Routes>
          </div>
      </Router>
  );
}

export default App;
