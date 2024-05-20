import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/CartPage.css';

const CartPage = ({ cartItems, setCartItems, savedForLater, setSavedForLater, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const handleSaveForLater = (item) => {
    setSavedForLater([...savedForLater, item]);
    handleRemoveItem(item);
  };

  const handleQuantityChange = (item, quantity) => {
    const updatedCart = cartItems.map(cartItem =>
      cartItem.id === item.id ? { ...cartItem, quantity: quantity } : cartItem
    );
    setCartItems(updatedCart);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleProceedToCheckout = () => {
    if (isLoggedIn) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="cart-page">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío. <Link to="/">Continúa comprando</Link></p>
      ) : (
        <div>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Precio: S/ {item.price}</p>
                  <p>
                    Cantidad:
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                    />
                  </p>
                  <button onClick={() => handleRemoveItem(item)}>Eliminar</button>
                  <button onClick={() => handleSaveForLater(item)}>Guardar para más tarde</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <h3>Resumen del Carrito</h3>
            <p>Subtotal: S/ {calculateSubtotal().toFixed(2)}</p>
            <button onClick={handleProceedToCheckout}>Proceder al Pago</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
