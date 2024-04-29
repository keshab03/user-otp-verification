import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup'
import Welcome from './Components/Welcome/Welcome';
import SeeAllDetails from  './Components/SeeAllDetails/SeeAllDetails'
const App = () => {

  return (
    <BrowserRouter>
      <div>
        <Nav />
        <Routes>
          <Route path='/' element={<Welcome />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/seealldetails' element={<SeeAllDetails />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
