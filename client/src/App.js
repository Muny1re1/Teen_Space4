import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import MainPage from './components/MainPage';
import Landingpage from './components/Landingpage';
import Notification from './components/Notification';
import Clubprofile from './components/Clubprofile';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/club/:id" element={<Clubprofile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
