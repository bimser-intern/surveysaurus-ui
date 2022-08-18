
import { useEffect } from 'react';
import './App.css';
import Home from './screens/Home';
import { useNavigate } from 'react-router-dom';
function App() {
  const navigate=useNavigate()
  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate("/userPage")
    }
  })
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
