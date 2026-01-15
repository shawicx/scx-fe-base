import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './routes/home';
import About from './routes/about';
import Login from './routes/login';
import Register from './routes/register';
import ResetPassword from './routes/reset-password';
import AiConfig from './routes/ai-config';
import AiChat from './routes/ai-chat';

function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/ai/config" element={<AiConfig />} />
        <Route path="/ai/chat" element={<AiChat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
