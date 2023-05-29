
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Detail from './pages/Detail';
import Listings from './pages/Listings';
import Login from './pages/Login';
import MyListings from './pages/MyListings';


function App() {
  return (

    <div className='App'>
      <div className='navbar'>
        <Navbar />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mylistings" element={<MyListings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
