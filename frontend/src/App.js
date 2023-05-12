import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Post from './pages/Post';
import Listing from './pages/Listing';
import Listings from './pages/Listings';
import Login from './pages/Login';
import MyListings from './pages/MyListings';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Post" element={<Post />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mylistings" element={<MyListings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
