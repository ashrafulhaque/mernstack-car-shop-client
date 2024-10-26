import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    category_id: "",
    imageURL: "",
    rating: "",
  });

  const BASE_URL = "https://mernstack-car-shop-server.vercel.app";

  const headers = {
    "Content-Type": "application/json",
  };

  // Fetch products and categories
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      toast.error("Error loading products");
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // Update existing product
        const response = await fetch(
          `${BASE_URL}/products/${selectedProduct._id}`,
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          toast.success("Product updated successfully!", {
            position: "bottom-right",
            style: { background: "green", color: "white" },
          });
        } else {
          throw new Error("Failed to update product");
        }
      } else {
        // Add new product
        const response = await fetch(`${BASE_URL}/products`, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("New product added successfully!", {
            position: "bottom-right",
            style: { background: "green", color: "white" },
          });
        } else {
          throw new Error("Failed to add product");
        }
      }

      // Reset form and fetch updated products
      setFormData({
        name: "",
        price: "",
        category: "",
        category_id: "",
        imageURL: "",
        rating: "",
      });
      setIsAddModalOpen(false);
      setIsEditMode(false);
      fetchProducts();
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        style: { background: "red", color: "white" },
      });
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(`${BASE_URL}/products/${id}`, {
          method: "DELETE",
          headers: headers,
        });

        if (response.ok) {
          Swal.fire("Deleted!", "Product has been deleted.", "success");
          fetchProducts();
        } else {
          throw new Error("Failed to delete product");
        }
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error deleting product!",
      });
    }
  };

  // Handle edit
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      category: product.category,
      category_id: product.category_id,
      imageURL: product.imageURL,
      rating: product.rating,
    });
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  // Handle category selection
  const handleCategoryChange = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setFormData({
      ...formData,
      category: selectedOption.text,
      category_id: selectedOption.value,
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | All Products</title>
      </Helmet>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="flex items-center justify-between p-6 border-b border-base-200">
            <h2 className="text-2xl font-bold">All Cars</h2>
            <button
              onClick={() => {
                setIsEditMode(false);
                setFormData({
                  name: "",
                  price: "",
                  category: "",
                  category_id: "",
                  imageURL: "",
                  rating: "",
                });
                setIsAddModalOpen(true);
              }}
              className="btn btn-primary gap-2"
            >
              <FaPlus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          {/* Table Section */}
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <FaSpinner className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full border">
                  <thead>
                    <tr className="bg-base-200 text-sm text-gray-600">
                      <th className="font-semibold border">#</th>
                      <th className="font-semibold border">Image</th>
                      <th className="font-semibold border">Name</th>
                      <th className="font-semibold border">Category</th>
                      <th className="font-semibold border">Price</th>
                      <th className="font-semibold border">Rating</th>
                      <th className="font-semibold border text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id} className="hover:bg-base-100">
                        <td className="border">{index + 1}</td>
                        <td className="border">
                          <img
                            src={product.imageURL || "/placeholder-car.png"}
                            alt={product.name}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                        </td>
                        <td className="border font-medium">{product.name}</td>
                        <td className="border">{product.category}</td>
                        <td className="border">${product.price}</td>
                        <td className="border">{product.rating}/5</td>
                        <td className="border text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(product)}
                              className="btn btn-ghost btn-sm"
                              title="Edit"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product._id)}
                              className="btn btn-ghost btn-sm text-error"
                              title="Delete"
                            >
                              <FaTrashAlt className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-base-100 rounded-lg p-4 w-full max-w-md">
              <h3 className="text-2xl font-bold">
                {isEditMode ? "Edit Product" : "Add New Product"}
              </h3>
              <div className="divider my-0"></div>

              <form onSubmit={handleSubmit} className="space-y-1">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Product Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Category</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    value={formData.category_id}
                    onChange={handleCategoryChange}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-between">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Price</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter price ($)"
                      className="input input-bordered w-full"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                      min="0"
                      step="1000"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Rating</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Enter rating (0-5)"
                      className="input input-bordered w-full"
                      value={formData.rating}
                      onChange={(e) =>
                        setFormData({ ...formData, rating: e.target.value })
                      }
                      required
                      min="0"
                      max="5"
                      step="1"
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">Image URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="Enter image URL"
                    className="input input-bordered w-full"
                    value={formData.imageURL}
                    onChange={(e) =>
                      setFormData({ ...formData, imageURL: e.target.value })
                    }
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <button type="submit" className="btn btn-accent">
                    {isEditMode ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddModalOpen(false);
                      setIsEditMode(false);
                    }}
                    className="btn btn-ghost"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AllProducts;
