import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { toast, Toaster } from "react-hot-toast";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaShare,
  FaTags,
  FaBox,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    specialInstructions: "",
  });

  useEffect(() => {
    fetch(`https://mernstack-car-shop-server.vercel.app/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData({
        ...formData,
        name: user.displayName || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const purchaseData = {
        ...formData,
        productId: product._id,
        productName: product.name,
        price: product.price,
        purchaseDate: new Date().toISOString(),
        userId: user.uid,
      };

      const response = await fetch(
        "https://mernstack-car-shop-server.vercel.app/productcart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(purchaseData),
        }
      );

      if (response.ok) {
        toast.success("Purchase completed successfully!", {
          position: "bottom-right",
          style: { background: "green", color: "white" },
        });
        setIsModalOpen(false);
      } else {
        throw new Error("Failed to complete purchase");
      }
    } catch (error) {
      toast.error("Failed to complete purchase. Please try again.", {
        position: "bottom-right",
        style: { background: "red", color: "white" },
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <span>Error: {error.message}</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-warning">
          <span>No product found.</span>
        </div>
      </div>
    );
  }

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={
          index < Math.floor(rating) ? "text-warning" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <>
      <Helmet>
        <title>NFS CarShop | {product.name}</title>
      </Helmet>
      <Toaster />

      <div className="min-h-screen bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Image Section */}
              <div className="space-y-4">
                <div className="relative group">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 space-x-2">
                    <button className="btn btn-circle btn-ghost bg-base-100">
                      <FaHeart className="text-error" />
                    </button>
                    <button className="btn btn-circle btn-ghost bg-base-100">
                      <FaShare className="text-primary" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Details Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold pt-3">{product.name}</h1>
                  <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-base-content/60">
                      ({product.rating} rating)
                    </span>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl font-bold">${product.price}</span>
                  <span className="text-sm text-base-content/60">USD</span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <FaTags className="text-base-content/60" />
                    <span>Category:</span>
                    <span className="badge badge-ghost">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FaBox className="text-base-content/60" />
                    <span>Stock Status:</span>
                    <span className="text-success font-medium">In Stock</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <FaShoppingCart className="mr-2" />
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog
        id="purchase_modal"
        className={`modal ${isModalOpen ? "modal-open" : ""}`}
      >
        <div className="modal-box w-full max-w-xl rounded-lg bg-white shadow-lg p-6">
          <h3 className="font-bold text-2xl text-gray-700 mb-6">
            Confirm Your Purchase
          </h3>

          {/* Product Information */}
          <div className="space-y-2 mb-2">
            <div className="text-xl font-semibold text-amber-600">
              {product.name}
            </div>
            <div className="text-sm text-gray-500">
              Price: <span className="font-semibold">${product.price} USD</span>
            </div>
            <div className="text-sm text-gray-500">
              Category:{" "}
              <span className="font-semibold">{product.category}</span>
            </div>
            <div className="divider"></div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Buyer Information */}
            <div className="space-y-2">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-600">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-600">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-600">Phone</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            <div className="divider my-2"></div>

            {/* Address Section */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-600">
                  Delivery Address
                </span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full h-24 resize-none"
                placeholder="Enter your delivery address..."
                required
              />
            </div>

            {/* Special Instructions */}
            <div className="form-control mt-2">
              <label className="label">
                <span className="label-text text-gray-600">
                  Special Instructions
                </span>
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                className="textarea textarea-bordered w-full h-24 resize-none"
                placeholder="Any special instructions for the delivery..."
              />
            </div>

            <div className="modal-action">
              <button type="submit" className="btn btn-accent">
                Confirm Purchase
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => setIsModalOpen(false)}>close</button>
        </form>
      </dialog>
    </>
  );
};

export default ProductDetailsPage;
