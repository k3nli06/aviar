import React from 'react';  
import { motion } from 'framer-motion';  
import ThemeToggle from './ThemeToggle';  
import NavigationMenu from './NavigationMenu';  

const AppHeader = () => {  
  return (  
    <>  
      <ThemeToggle />  
      <NavigationMenu />  
    </>  
  );  
};  

export default AppHeader;