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
          <div
            key={item.id}
            className="d-flex justify-content-between align-items-center mb-3"
          >
            <div>
              <strong>{item.name}</strong>
              <p className="mb-0">₹{item.price}</p>
            </div>

            <div className="d-flex align-items-center gap-2">
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                -
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
        ))}

        <hr />

        <div className="d-flex justify-content-between">
          <h6>Subtotal:</h6>
          <h6>₹{subtotal}</h6>
        </div>

        {offers.map((offer, index) => (
          <p key={index} className="text-success">
            {offer.description}: ₹{offer.savings}
          </p>
        ))}
        <div className="d-flex justify-content-between">
          <h6>Total Savings:</h6>
          <h6>₹{totalSavings}</h6>
        </div>

        <div className="d-flex justify-content-between">
          <h6>Final Total:</h6>
          <h6>₹{finalTotal}</h6>
        </div>

        <button className="btn btn-primary w-100 mt-3">Checkout</button>
      </div>
    </div>
  );
};

export default CartSidebar;
