import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Navbar from './components/Navbar';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <>
    <Navbar /> 
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
    </Routes>
    </div>
    </>
  );
}

export default App;
