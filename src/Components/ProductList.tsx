import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../App/store";
import { addToCart } from "../features/Cart/CartSlice";

const ProductList = () => {
  const products = useSelector((state: RootState) => state.products.items);

  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Products</h2>

        <button
          className="btn btn-outline-dark"
          data-bs-toggle="offcanvas"
          data-bs-target="#cartSidebar"
        >
          Bag ({cartCount})
        </button>
      </div>

      {products.map((product) => (
        <div
          key={product.id}
          className="d-flex justify-content-between align-items-center border-bottom py-2"
        >
          <strong>{product.name}</strong>

          <div className="d-flex align-items-center">
            <span className="me-3 text-muted">
              £<strong>{product.price.toFixed(2)}</strong>
            </span>

            <button
              className="btn btn-primary btn-sm"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartSidebar"
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Bag
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
