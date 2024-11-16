import React from 'react';
import { CartProvider } from './CartContext';
import Navigation from './Navigation'; 

const App = () => {
  return (
    <CartProvider>
      <Navigation />
    </CartProvider>
  );
};

export default App;
