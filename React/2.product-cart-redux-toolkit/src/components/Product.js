import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
import { useNavigate } from "react-router-dom";
import CommonModal from "../components/CommonModal";

function Product() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchProducts()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setModalProduct(product);
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  const goToCart = () => {
    navigate("/cart");
    closeModal();
  };

  return (
    <div className="container">
      <h2 className="mb-4 text-center">Product List</h2>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading products…</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <div className="card h-100 product-card">
                <img
                  src={product.image}
                  className="card-img-top p-3"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body d-flex flex-column">
                  <h6
                    className="card-title text-truncate"
                    title={product.title}
                  >
                    {product.title}
                  </h6>
                  <p
                    className="card-text text-muted small"
                    style={{ flexGrow: 1 }}
                  >
                    {product.description.slice(0, 100)}…
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="fw-bold">₹ {product.price}</span>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CommonModal
        show={showModal}
        title="Product Added to Cart"
        onClose={closeModal}
        body={
          modalProduct && (
            <div className="text-center">
              <p>
                <strong>{modalProduct.title}</strong> has been added to your cart.
              </p>
              <img
                src={modalProduct.image}
                alt={modalProduct.title}
                className="img-fluid"
                style={{ maxHeight: "200px", objectFit: "contain" }}
              />
            </div>
          )
        }
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>
              Close
            </button>
            <button className="btn btn-primary" onClick={goToCart}>
              Go to Cart
            </button>
          </>
        }
      />
    </div>
  );
}

export default Product;
