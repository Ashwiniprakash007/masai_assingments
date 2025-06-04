import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Q1/Navbar';
import Home from './Q1/Home';
import About from './Q1/About';
import PostDetails from './Q1/PostDetails';
import ProductList from './Q2/ProductList';
import ProductDetail from './Q2/ProductDetail';

import HomePage from "./Q3/HomePage"
import Profile from './Q3/Profile';
import Settings from './Q3/Settings';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Q1 */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
        <Route path="/about" element={<About />} /> */}


        {/* Q3 */}
          <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Q4 */}
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
