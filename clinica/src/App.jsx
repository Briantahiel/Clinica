
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './assets/Provider/UserProvider';
import Home from './components/Home';
import Login from './components/Login';
import Form from './components/Form';
// import Navbar from './components/Navbar';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
