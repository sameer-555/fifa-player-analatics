import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FixedNavbarExample from './components/Navbar'
import Home from './components/Home'
import PlayerForm from './components/NewPlayer'
function App() {
  return (
    <div className="App">
      <FixedNavbarExample />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>
          <Route path="/player" element={<PlayerForm />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
