
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlist } from "../features/wishlist/wishlistSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const isWishlisted = wishlistItems.some(
    (item) => item.id === product.id
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity: 1 }));
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button
          type="button"
          className={`wishlist-button ${isWishlisted ? "active" : ""}`}
          onClick={() => dispatch(toggleWishlist(product))}
          aria-label={
            isWishlisted ? "Remove from wishlist" : "Add to wishlist"
          }
          aria-pressed={isWishlisted}
        >
          {isWishlisted ? "♥" : "♡"}
        </button>

        <Link to={`/product/${product.id}`} className="product-image-link">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <Link to={`/product/${product.id}`} className="product-title-link">
          <span className="product-title">{product.title}</span>
        </Link>

        <p className="product-rating">
          <span>★</span> {product.rating?.rate ?? "N/A"}
          <span className="rating-count">
            ({product.rating?.count ?? 0})
          </span>
        </p>

        <div className="product-card-bottom">
          <span className="product-price">
            ${Number(product.price).toFixed(2)}
          </span>

          <button
            type="button"
            className="button button-small"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
