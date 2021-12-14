import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FixedNavbarExample from './components/Navbar'
import Home from './components/Home'
function App() {
  return (
    <div className="App">
      <FixedNavbarExample />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
