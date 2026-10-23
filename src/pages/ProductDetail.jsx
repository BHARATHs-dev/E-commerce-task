
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../features/products/productsSlice";
import { addToCart } from "../features/cart/cartSlice";
import QuantityStepper from "../components/QuantityStepper";

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { items, status, error } = useSelector(
    (state) => state.products
  );

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  const product = items.find((item) => item.id === Number(id));

  const handleAddToCart = () => {
    if (!product) return;

    dispatch(addToCart({ product, quantity }));
    setAdded(true);
  };

  if (status === "idle" || status === "loading") {
    return (
      <main className="container">
        <p className="status-message">Loading product...</p>
      </main>
    );
  }

  if (status === "failed") {
    return (
      <main className="container">
        <div className="error-message">
          <p>Couldn't load product. {error}</p>
          <button
            className="button"
            onClick={() => dispatch(fetchProducts())}
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container">
        <h2>Product not found</h2>
        <Link to="/" className="button">
          Back to products
        </Link>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="breadcrumb">
        <Link to="/">Products</Link>
        <span>/</span>
        <span>{product.category}</span>
      </div>

      <section className="detail-layout">
        <div className="detail-image-wrap">
          <img
            src={product.image}
            alt={product.title}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <p className="eyebrow">{product.category}</p>

          <h1 className="detail-title">{product.title}</h1>

          <div className="detail-rating">
            <span>★</span> {product.rating?.rate ?? "N/A"}
            <span className="rating-count">
              ({product.rating?.count ?? 0} reviews)
            </span>
          </div>

          <p className="detail-price">
            ${product.price.toFixed(2)}
          </p>

          <p className="detail-description">
            {product.description}
          </p>

          <div className="detail-quantity">
            <span className="field-label">Quantity</span>

            <QuantityStepper
              quantity={quantity}
              onIncrease={() => {
                setQuantity((current) => current + 1);
                setAdded(false);
              }}
              onDecrease={() => {
                setQuantity((current) => Math.max(1, current - 1));
                setAdded(false);
              }}
            />
          </div>

          <button
            className="button detail-add-button"
            onClick={handleAddToCart}
          >
            {added ? "Add more to cart" : "Add to cart"} · $
            {(product.price * quantity).toFixed(2)}
          </button>

          {added && (
            <p className="success-message">
              Added {quantity} item(s) to your cart!
              {" "}
              <Link to="/cart">View cart</Link>
            </p>
          )}

          <p className="shipping-note">
            Free shipping on orders of $100 or more.
          </p>
        </div>
      </section>
    </main>
  );
}

export default ProductDetail;
