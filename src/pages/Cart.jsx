
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  increase,
  decrease,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";

import QuantityStepper from "../components/QuantityStepper";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal === 0 || subtotal >= 100 ? 0 : 5;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <main className="container">
        <section className="empty-cart">
          <div className="empty-cart-icon">🛍️</div>
          <h1>Your cart is empty</h1>
          <p className="muted-text">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/" className="button">
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h1>Your cart</h1>
          <p className="muted-text">
            {cartItems.reduce(
              (count, item) => count + item.quantity,
              0
            )}{" "}
            items in your cart
          </p>
        </div>

        <button
          type="button"
          className="clear-cart-button"
          onClick={() => dispatch(clearCart())}
        >
          Clear cart
        </button>
      </div>

      <div className="cart-layout">
        <section className="cart-items">
          {cartItems.map((item) => (
            <article className="cart-item" key={item.id}>
              <Link
                to={`/product/${item.id}`}
                className="cart-item-image-wrap"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
              </Link>

              <div className="cart-item-info">
                <span className="product-category">
                  {item.category}
                </span>

                <Link
                  to={`/product/${item.id}`}
                  className="cart-item-title"
                >
                  {item.title}
                </Link>

                <p className="cart-unit-price">
                  ${item.price.toFixed(2)} each
                </p>

                <button
                  type="button"
                  className="remove-button"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>

              <div className="cart-item-actions">
                <QuantityStepper
                  quantity={item.quantity}
                  onIncrease={() => dispatch(increase(item.id))}
                  onDecrease={() => dispatch(decrease(item.id))}
                />

                <p className="cart-line-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </article>
          ))}

          <Link to="/" className="continue-shopping">
            ← Continue shopping
          </Link>
        </section>

        <aside className="order-summary">
          <h2>Order summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span className={shipping === 0 ? "free-shipping" : ""}>
              {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
            </span>
          </div>

          {subtotal > 0 && subtotal < 100 && (
            <p className="shipping-progress">
              ${(100 - subtotal).toFixed(2)} more for free shipping.
            </p>
          )}

          {subtotal >= 100 && (
            <p className="free-shipping">
              You've unlocked free shipping!
            </p>
          )}

          <div className="summary-divider" />

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            type="button"
            className="button checkout-button"
            onClick={() =>
              window.alert("Checkout is not implemented in this task.")
            }
          >
            Proceed to checkout
          </button>

          <p className="summary-note">
            Shipping is free on orders of $100 or more.
          </p>
        </aside>
      </div>
    </main>
  );
}

export default Cart;
