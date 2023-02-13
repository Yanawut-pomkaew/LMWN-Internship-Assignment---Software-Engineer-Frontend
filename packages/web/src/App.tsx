import React from 'react';
import Banner from './components/Banner';
import Menu from './components/Menu';
import '../index.css';
import {BrowserRouter as Router, Route ,Routes ,useParams , Link} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path=':id' element={<Banner />}/>
        </Routes>
      </Router>
     
    </div>
  )
}

export default App;
