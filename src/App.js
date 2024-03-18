// *****************************
// @author - Prathamesh Patil  **
// ****************************

import './App.css';

import Home from './Components/Customer/Home';
import { LoginForm } from './Components/Login/LoginForm';
import { SignupForm } from './Components/Login/SignupForm';
import Dashbord from './Components/Owner Dashbord/Dashbord';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Profile from './Components/Customer/Profile';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
          <Route path='/dashboard' element={<Dashbord />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
