import React, { createContext, useState, useEffect } from 'react';

const CarritoContext = createContext();

const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const [guardadoParaDespues, setGuardadoParaDespues] = useState([]);

  useEffect(() => {
    const carritoLocal = JSON.parse(localStorage.getItem('carrito')) || [];
    setCarrito(carritoLocal);
    
    const guardadoLocal = JSON.parse(localStorage.getItem('guardadoParaDespues')) || [];
    setGuardadoParaDespues(guardadoLocal);
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    localStorage.setItem('guardadoParaDespues', JSON.stringify(guardadoParaDespues));
  }, [guardadoParaDespues]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prevCarrito) => {
      const itemExistente = prevCarrito.find(item => item.id === producto.id);
      if (itemExistente) {
        return prevCarrito.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad }];
      }
    });
  };

  const cambiarCantidad = (id, cantidad) => {
    setCarrito((prevCarrito) =>
      prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
  };

  const moverAGuardadoParaDespues = (id) => {
    setCarrito((prevCarrito) => {
      const item = prevCarrito.find(item => item.id === id);
      setGuardadoParaDespues((prevGuardado) => [...prevGuardado, item]);
      return prevCarrito.filter(item => item.id !== id);
    });
  };

  const moverAlCarrito = (id) => {
    setGuardadoParaDespues((prevGuardado) => {
      const item = prevGuardado.find(item => item.id === id);
      setCarrito((prevCarrito) => [...prevCarrito, item]);
      return prevGuardado.filter(item => item.id !== id);
    });
  };

  const eliminarDeGuardadoParaDespues = (id) => {
    setGuardadoParaDespues((prevGuardado) => prevGuardado.filter(item => item.id !== id));
  };

  const valor = {
    carrito,
    guardadoParaDespues,
    agregarAlCarrito,
    cambiarCantidad,
    eliminarDelCarrito,
    moverAGuardadoParaDespues,
    moverAlCarrito,
    eliminarDeGuardadoParaDespues,
  };

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
};

export { CarritoContext, CarritoProvider };
