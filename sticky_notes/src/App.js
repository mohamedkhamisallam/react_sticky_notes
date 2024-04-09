// importanttttttttttttttttttttttttttttttttttttttttttt//
// before start react server do not forget to start backend server by command
// nodemon or node index.js

import './App.css';
import Navbarr from './Components/Navbarr';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import{Routes,Route, useNavigate}from'react-router-dom';
import ProtectedRoute from './Components/ProtectedRoute';
import { useEffect } from 'react';

function App() {
  let navigate=useNavigate()
  let token=localStorage.getItem('token')
  useEffect(() => {
    if(token){
      navigate('/home')
        }else{
          navigate('/login')
        }
  }, [])
  
  return (
    <div >

      
     <Navbarr token={token}/>
     <Routes>
     <Route path="/" element={<Login />}/>
      <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/*" element={<h1>NOT FOUND</h1>}/>
     </Routes>
     
    </div>
  );
}

export default App;
