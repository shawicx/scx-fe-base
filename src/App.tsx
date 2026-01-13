import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import About from './routes/about';
import Login from './routes/login';
import Register from './routes/register';
import ResetPassword from './routes/reset-password';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
