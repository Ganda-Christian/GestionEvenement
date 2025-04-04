import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import logo2 from './assets/logo2.png';
import './App.css';
import './components/i18n';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddUserForm from './components/addUserForm';
import AddEditDeleteEvent from './components/addEditDeleteEvent';
import Home from './components/Home';
import Ticket from './components/Ticket';
import PrivateRoute from './components/privateRoute';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute />} />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addUserForm" element={<AddUserForm/>}/>
        <Route path="/addEditDeleteEvent" element={<AddEditDeleteEvent/>}/>
        <Route path="/ticket" element={<Ticket/>}/>
      </Routes>
    </Router>
  );
    
}

export default App;