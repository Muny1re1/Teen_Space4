import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pages from './components/Pages';
import Login from './components/Login';
import SignUp from './components/Signup';
import MainPage from './components/MainPage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Pages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
