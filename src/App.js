import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import './components/i18n';
import Login from './components/Login';
import Home from './components/Home';    // Page d'accueil après la connexion
import AddUserForm from './components/addUserForm';
import AddEditDeleteEvent from './components/addEditDeleteEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addUserForm" element={<AddUserForm/>}/>
        <Route path="/addEditDeleteEvent" element={<AddEditDeleteEvent/>}/>
      </Routes>
    </Router>
  );
    
}

export default App;