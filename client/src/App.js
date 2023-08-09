import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Contact from './routes/Contact';
import Navbar from './components/Navbar';
import Login from './routes/Login';
import SignUp from './routes/SignUp';
import BookForm from './routes/BookForm';
import Recommendations from './routes/Recommendations';
// import Card from './components/Card';

function App() {
  return (
    <>
    <Navbar /> 
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/bookform' element={<BookForm />}/>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/recommendations' element={<Recommendations />} />
      <Route path='/contact' element={<Contact />} />
      {/* <Route path='/:id' element={<Card />} /> */}
    </Routes>
    </div>
    </>
  );
}

export default App;
