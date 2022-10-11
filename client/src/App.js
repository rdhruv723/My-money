import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'
import Test from './pages/Test';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path='/' element = { <ProctectedRoute> <Home/> </ProctectedRoute>} />
          <Route path='/login' element = {<Login/>} />
          <Route path='/register' element = {<Register/>} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export function ProctectedRoute(props){
  if(localStorage.getItem('mymoney-user')){
    return props.children
  }
  else{
    return <Navigate to = '/login' />
  }
}


export default App;
