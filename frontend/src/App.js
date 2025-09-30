import React, { useEffect } from 'react';  
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';  
import { motion } from 'framer-motion';  
import LoginForm from './components/LoginForm';  
import RegisterForm from './components/RegisterForm';  
import Dashboard from './components/Dashboard';  
import BirdCatalog from './components/BirdCatalog';  
import ReservesInfo from './components/ReservesInfo';  
import CalendarView from './components/CalendarView';  
import BookingSystem from './components/BookingSystem';  
import EducationModule from './components/EducationModule';  

function App() {  
  useEffect(() => {  
    // Aplicar tema guardado  
    const savedTheme = localStorage.getItem('theme') || 'light';  
    if (savedTheme === 'dark') {  
      document.documentElement.classList.add('dark');  
    } else {  
      document.documentElement.classList.remove('dark');  
    }  
  }, []);  

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';  

  return (  
    <Router>  
      <motion.div  
        initial={{ opacity: 0 }}  
        animate={{ opacity: 1 }}  
        transition={{ duration: 0.6 }}  
      >  
        <Routes>  
          <Route path="/" element={!isLoggedIn ? <LoginForm /> : <Navigate to="/app" />} />  
          <Route path="/register" element={!isLoggedIn ? <RegisterForm /> : <Navigate to="/app" />} />  
          <Route path="/app" element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />} />  
          <Route path="/catalog" element={isLoggedIn ? <BirdCatalog /> : <Navigate to="/" />} />  
          <Route path="/reserves" element={isLoggedIn ? <ReservesInfo /> : <Navigate to="/" />} />  
          <Route path="/calendar" element={isLoggedIn ? <CalendarView /> : <Navigate to="/" />} />  
          <Route path="/booking" element={isLoggedIn ? <BookingSystem /> : <Navigate to="/" />} />  
          <Route path="/education" element={isLoggedIn ? <EducationModule /> : <Navigate to="/" />} />  
        </Routes>  
      </motion.div>  
    </Router>  
  );  
}  

export default App;