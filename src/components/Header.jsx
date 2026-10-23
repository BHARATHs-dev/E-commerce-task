
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          <span>C</span>artNest
        </Link>

        <nav className="nav-links">
          <NavLink to="/" end>
            Products
          </NavLink>

          <NavLink to="/wishlist">
            Wishlist
            <span className="cart-badge">
              {wishlistItems.length}
            </span>
          </NavLink>

          <NavLink to="/cart">
            Cart
            <span className="cart-badge">
              {cartCount}
            </span>
          </NavLink>

          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

export default Header;
