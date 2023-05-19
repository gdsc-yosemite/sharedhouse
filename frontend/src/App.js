import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Listing from './pages/Listing';
import PaginatedListings from './pages/Listings';
import Login from './pages/Login';
import MyListings from './pages/MyListings';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/listings" element={<PaginatedListings listingsPerPage={5} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mylistings" element={<MyListings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
