import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CheckoutPage.css';

const CheckoutPage = ({ cartItems, handleCompleteOrder }) => {
  const navigate = useNavigate();
  const [shippingAddress, setShippingAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderSummary, setOrderSummary] = useState({
    subtotal: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    shipping: 17.00, // Default shipping cost
    tax: 0,
    total: 0,
  });

  useEffect(() => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const tax = subtotal * 0.18;
    const total = subtotal + orderSummary.shipping + tax;
    setOrderSummary((prevSummary) => ({
      ...prevSummary,
      subtotal: subtotal,
      tax: tax,
      total: total,
    }));
  }, [cartItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOrderCompletion = () => {
    // Validate form data
    if (!shippingAddress.line1 || !shippingAddress.city || !shippingAddress.country || !shippingAddress.district) {
      alert('Por favor, complete todos los campos de la dirección de envío.');
      return;
    }
    if (paymentMethod === 'creditCard' && (!shippingAddress.cardNumber || !shippingAddress.cardName || !shippingAddress.expiry || !shippingAddress.ccv)) {
      alert('Por favor, complete todos los campos de la tarjeta de crédito.');
      return;
    }

    // Create new order object
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      items: cartItems.map(item => ({
        ...item,
        quantity: item.quantity,
      })),
      subtotal: orderSummary.subtotal,
      shipping: orderSummary.shipping,
      tax: orderSummary.tax,
      total: orderSummary.total,
      address: `${shippingAddress.line1}, ${shippingAddress.line2}, ${shippingAddress.district}, ${shippingAddress.city}, ${shippingAddress.country}`,
      paymentMethod: paymentMethod,
    };

    // Call function to handle order completion
    handleCompleteOrder(newOrder);

    // Clear cart items and navigate to order complete page
    navigate('/order-complete');
  };

  return (
    <div className="checkout-page">
      <h2>¡Casi Listo! Tu orden no estará completa hasta que revises y presiones el botón “completar orden” al final de la página.</h2>
      <div className="checkout-form">
        <div className="form-section">
          <h3>Dirección de Envío</h3>
          <input name="line1" placeholder="Línea 1" onChange={handleInputChange} />
          <input name="line2" placeholder="Línea 2" onChange={handleInputChange} />
          <input name="district" placeholder="Distrito" onChange={handleInputChange} />
          <input name="city" placeholder="Ciudad" onChange={handleInputChange} />
          <input name="country" placeholder="País" onChange={handleInputChange} />
        </div>
        <div className="form-section">
          <h3>Pago</h3>
          <div>
            <input type="radio" id="qr" name="paymentMethod" value="qr" checked={paymentMethod === 'qr'} onChange={handlePaymentChange} />
            <label htmlFor="qr">Pago con código QR</label>
            {paymentMethod === 'qr' && <img src="path-to-qr-code-image.png" alt="Código QR" />}
          </div>
          <div>
            <input type="radio" id="creditCard" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={handlePaymentChange} />
            <label htmlFor="creditCard">Pago con tarjeta de crédito</label>
            {paymentMethod === 'creditCard' && (
              <div>
                <input name="cardNumber" placeholder="Número de Tarjeta" onChange={handleInputChange} />
                <input name="cardName" placeholder="Nombre en tarjeta" onChange={handleInputChange} />
                <input name="expiry" placeholder="Vencimiento" onChange={handleInputChange} />
                <input name="ccv" placeholder="CCV" onChange={handleInputChange} />
              </div>
            )}
          </div>
        </div>
        <div className="form-section">
          <h3>Método de Envío</h3>
          <div>
            <input type="radio" id="economy" name="shippingMethod" value="economy" defaultChecked onChange={() => setOrderSummary((prevSummary) => ({ ...prevSummary, shipping: 10.00, total: prevSummary.subtotal + 10.00 + prevSummary.tax }))} />
            <label htmlFor="economy">Económico Aéreo - S/10.00</label>
          </div>
          <div>
            <input type="radio" id="priority" name="shippingMethod" value="priority" onChange={() => setOrderSummary((prevSummary) => ({ ...prevSummary, shipping: 17.00, total: prevSummary.subtotal + 17.00 + prevSummary.tax }))} />
            <label htmlFor="priority">Envío prioritario (5 a 10 días) - S/17.00</label>
          </div>
        </div>
        <div className="order-summary">
          <h3>Resumen de Orden</h3>
          <p>Subtotal: S/ {orderSummary.subtotal.toFixed(2)}</p>
          <p>Envío: S/ {orderSummary.shipping.toFixed(2)}</p>
          <p>Impuestos: S/ {orderSummary.tax.toFixed(2)}</p>
          <p>Total: S/ {orderSummary.total.toFixed(2)}</p>
        </div>
        <button onClick={handleOrderCompletion}>Completar Orden</button>
      </div>
    </div>
  );
};

export default CheckoutPage;
