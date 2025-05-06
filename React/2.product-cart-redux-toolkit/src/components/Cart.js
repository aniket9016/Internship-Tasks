import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <div className="alert alert-info">Your cart is empty.</div>
      ) : (
        <div className="row">
          {cartItems.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100 product-card d-flex flex-column">
                <img
                  src={item.image}
                  className="card-img-top p-3"
                  alt={item.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h6 className="card-title text-truncate" title={item.title}>
                    {item.title}
                  </h6>
                  <p
                    className="card-text text-muted small"
                    style={{ flexGrow: 1 }}
                  >
                    {item.description.slice(0, 100)}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold">₹ {item.price}</span>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
