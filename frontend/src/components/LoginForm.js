import React, { useState } from 'react';  
import { motion } from 'framer-motion';  
import { Mail, Lock, LogIn, Eye, EyeOff, User } from 'lucide-react';  
import { useNavigate, Link } from 'react-router-dom';  

const LoginForm = () => {  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [showPassword, setShowPassword] = useState(false);  
  const [error, setError] = useState('');  
  const [isLoading, setIsLoading] = useState(false);  
  const navigate = useNavigate(); 
  const url = 'http://localhost:8080/api/';

  const handleSubmit = async (e) => {  
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const credentials = {'correo': email, claveHash: password};

    try {
      const response = await fetch(url + 'auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

    if (!response.ok) {
      throw new Error(response.status)
    }

    const responseData = await response.json();

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('authToken', responseData.token);  
    navigate(0); 
    setIsLoading(false);
    
    } catch (error) {

      if (error.message === '401') {
        console.error('Acceso denegado');
        setError("credenciales incorrectas");    
      } else {
        console.error('Error al intentar contactar al servidor:', error.message);
        setError("Error al intentar contactar al servidor");
      }
    
    } finally {
      setIsLoading(false);
    }
  };  

  const handleForgotPassword = () => {  
    // Simula recuperación  
    alert('¡Recuperación simulada! Usa el usuario de prueba para entrar.');  
  };  

  return (  
    <motion.div  
      initial={{ opacity: 0, scale: 0.9 }}  
      animate={{ opacity: 1, scale: 1 }}  
      className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 py-8"  
    >  
      <motion.div  
        className="w-full max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border border-green-200/50 dark:border-gray-700/50 rounded-3xl p-8 shadow-xl"  
        whileHover={{ y: -5 }}  
      >  
        <div className="text-center mb-8">  
          <motion.div  
            className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-4"  
            whileHover={{ scale: 1.05 }}  
          >  
            <LogIn className="w-10 h-10 text-white" />  
          </motion.div>  
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Bienvenido a Aviar</h2>  
          <p className="text-gray-600 dark:text-gray-300">Ingresa para explorar el mundo de las aves</p>  
        </div>  

        <form onSubmit={handleSubmit} className="space-y-6">  
          <div>  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">  
              Correo Electrónico  
            </label>  
            <div className="relative">  
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
              <input  
                type="email"  
                value={email}  
                onChange={(e) => setEmail(e.target.value)}  
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-white placeholder-gray-500"  
                placeholder="test@test.com"  
                required  
              />  
            </div>  
          </div>  

          <div>  
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">  
              Contraseña  
            </label>  
            <div className="relative">  
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />  
              <input  
                type={showPassword ? 'text' : 'password'}  
                value={password}  
                onChange={(e) => setPassword(e.target.value)}  
                className="w-full pl-10 pr-10 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 text-gray-900 dark:text-white placeholder-gray-500"  
                placeholder="1234"  
                required  
              />  
              <button  
                type="button"  
                onClick={() => setShowPassword(!showPassword)}  
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"  
              >  
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}  
              </button>  
            </div>  
          </div>  

          {error && (  
            <motion.p  
              initial={{ opacity: 0, y: -10 }}  
              animate={{ opacity: 1, y: 0 }}  
              className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-xl"  
            >  
              {error}  
            </motion.p>  
          )}  

          <motion.button  
            type="submit"  
            disabled={isLoading}  
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-2xl font-semibold hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"  
            whileHover={{ scale: 1.02 }}  
            whileTap={{ scale: 0.98 }}  
          >  
            {isLoading ? 'Entrando...' : 'Iniciar Sesión'}  
          </motion.button>  
        </form>  

        <div className="mt-6 text-center">  
          <button  
            onClick={handleForgotPassword}  
            className="text-green-600 dark:text-green-400 hover:underline text-sm"  
          >  
            ¿Olvidaste tu contraseña?  
          </button>  
        </div>  

        <div className="mt-4 text-center">  
          <Link  
            to="/register"  
            className="text-green-600 dark:text-green-400 hover:underline text-sm"  
          >  
            ¿No tienes cuenta? Regístrate aquí  
          </Link>  
        </div>  

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">  
        </p>  
      </motion.div>  
    </motion.div>  
  );  
};  

export default LoginForm;