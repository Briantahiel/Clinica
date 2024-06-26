
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './assets/Provider/UserProvider';
import Home from './components/Home';
import Login from './components/Login';
import Form from './components/Form';
import MedicoForm from './components/FormMedico';
import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/form" element={<Form />} />
          <Route path="/med" element={<MedicoForm />} />
        </Routes>
      <Footer />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
