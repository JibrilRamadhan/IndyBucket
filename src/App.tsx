import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Collections from './pages/Collections';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="collections" element={<Collections />} />
          {/* Add more routes here in the future */}
          {/* <Route path="shop" element={<Shop />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
