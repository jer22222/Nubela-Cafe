import { useState } from "react";

const products = [
  { id: 1, name: "Cappuccino", price: 4.25, image: "https://www.clarin.com/img/2022/03/01/ceq4FUBv9_2000x1500__1.jpg" },
  { id: 2, name: "Latte", price: 4.75, image: "https://www.foodandwine.com/thmb/CCe2JUHfjCQ44L0YTbCu97ukUzA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Partners-Latte-FT-BLOG0523-09569880de524fe487831d95184495cc.jpg" },
  { id: 3, name: "Espresso", price: 3.00, image: "https://blogstudio.s3.theshoppad.net/coffeeheroau/ec178d83e5f597b162cda1e60cb64194.jpg" },
  { id: 4, name: "Mocha", price: 5.00, image: "https://gatherforbread.com/wp-content/uploads/2014/10/Dark-Chocolate-Mocha-Square.jpg" },
  { id: 5, name: "Americano", price: 3.50, image: "https://coffeforus.com/wp-content/uploads/2022/12/Americano-coffee-recipe-1068x712.jpg" }
];

export default function McdoPOSDashboard({ userName, onLogout }) {
  const [order, setOrder] = useState([]);

  const addProduct = (product) => {
    setOrder((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const decreaseProduct = (productId) => {
    setOrder((prev) => {
      return prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const removeProduct = (productId) => {
    setOrder((prev) => prev.filter((item) => item.id !== productId));
  };

  const totalPrice = order.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="pos-dashboard">
      <header className="pos-header">
        <h1>Nubela Cafe</h1>
        <div>
          <span>Welcome, {userName}!</span>
          <button className="logout-btn" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main className="pos-main">
        {/* Products grid */}
        <section className="pos-products">
          <h2>Menu</h2>
          <div className="products-grid">
            {products.map((product) => (
              <button
                key={product.id}
                className="product-btn"
                onClick={() => addProduct(product)}
                aria-label={`Add ${product.name} to order`}
              >
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">${product.price.toFixed(2)}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Receipt panel */}
        <section className="pos-receipt">
          <h2>Order Receipt</h2>
          {order.length === 0 ? (
            <p>No items in order</p>
          ) : (
            <ul className="order-list">
              {order.map((item) => (
                <li key={item.id} className="order-item">
                  <div className="item-info">
                    <span>{item.name}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="item-controls">
                    <button onClick={() => decreaseProduct(item.id)} aria-label={`Decrease quantity of ${item.name}`}>−</button>
                    <span className="quantity">{item.quantity}</span>
                    <button onClick={() => addProduct(item)} aria-label={`Increase quantity of ${item.name}`}>+</button>
                    <button onClick={() => removeProduct(item.id)} className="remove-btn" aria-label={`Remove ${item.name}`}>✕</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="order-total">
            <strong>Total:</strong> ${totalPrice.toFixed(2)}
          </div>
          <button 
            className="checkout-btn"
            disabled={order.length === 0}
            onClick={() => {
              alert(`Thank you for your purchase! Total: $${totalPrice.toFixed(2)}`);
              setOrder([]);
            }}
          >
            Checkout
          </button>
        </section>
      </main>
    </div>
  );
}
