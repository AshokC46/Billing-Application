import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../App/store";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "../features/Cart/CartSlice";
import { calculateOffers } from "../Utils/Offers";

const CartSidebar = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  const formatPrice = (price: number) => `£${price.toFixed(2)}`;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const { offers, totalSavings, finalTotal } = calculateOffers(cartItems);

  return (
    <div className="offcanvas offcanvas-end" tabIndex={-1} id="cartSidebar">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title">Basket</h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        />
      </div>

      <div className="offcanvas-body">
        {cartItems.length === 0 && <p>Your cart is empty</p>}

        {cartItems.map((item) => (
          <div key={item.id} className="mb-3">
            <div className="d-flex align-items-center justify-content-between">
              <div style={{ flex: 1 }}>
                <strong>{item.name}</strong>
              </div>

              <div
                style={{
                  width: "80px",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                £<strong>{item.price.toFixed(2)}</strong>
              </div>

              <div className="d-flex align-items-center gap-2">
                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => dispatch(addToCart(item))}
                >
                  +
                </button>

                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between">
          <h6>Subtotal:</h6>
          <h6>{formatPrice(subtotal)}</h6>
        </div>

        {offers.map((offer, index) => (
          <div
            key={index}
            className="d-flex justify-content-between text-success"
          >
            <span>{offer.description}</span>
            <span>{formatPrice(offer.savings)}</span>
          </div>
        ))}

        <div className="d-flex justify-content-between mt-2">
          <h6>Total Savings:</h6>
          <h6>{formatPrice(totalSavings)}</h6>
        </div>

        <div className="d-flex justify-content-between fw-bold">
          <h6>Final Total:</h6>
          <h6>{formatPrice(finalTotal)}</h6>
        </div>

        <button className="btn btn-primary w-100 mt-3">Checkout</button>
      </div>
    </div>
  );
};

export default CartSidebar;
