import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrashAlt, FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageURL: "",
  });

  const BASE_URL = "https://mernstack-car-shop-server.vercel.app/categories";

  // Common headers for all requests
  const headers = {
    "Content-Type": "application/json",
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(BASE_URL, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      setCategories(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
      toast.error("Error loading categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // Update existing category
        const response = await fetch(`${BASE_URL}/${selectedCategory._id}`, {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("Category updated successfully!", {
            position: "bottom-right",
            style: {
              background: "green",
              color: "white",
            },
          });
        } else {
          throw new Error("Failed to update category");
        }
      } else {
        // Add new category
        const response = await fetch(BASE_URL, {
          method: "POST",
          headers: headers,
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          toast.success("New category added successfully!", {
            position: "bottom-right",
            style: {
              background: "green",
              color: "white",
            },
          });
        } else {
          throw new Error("Failed to add category");
        }
      }

      // Reset form and fetch updated categories
      setFormData({
        name: "",
        description: "",
        imageURL: "",
      });
      setIsAddModalOpen(false);
      setIsEditMode(false);
      fetchCategories();
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-right",
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Deleting any category might have serious side effects on your website!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await fetch(`${BASE_URL}/${id}`, {
          method: "DELETE",
          headers: headers,
        });

        if (response.ok) {
          Swal.fire("Deleted!", "Category has been deleted.", "success");
          fetchCategories();
        } else {
          throw new Error("Failed to delete category");
        }
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error deleting category!",
      });
    }
  };

  // Handle edit
  const handleEdit = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      imageURL: category.imageURL,
    });
    setIsEditMode(true);
    setIsAddModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | All Categories</title>
      </Helmet>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-base-100 rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="flex items-center justify-between p-6 border-b border-base-200">
            <h2 className="text-2xl font-bold">Vehicle Categories</h2>
            <button
              onClick={() => {
                setIsEditMode(false);
                setFormData({
                  name: "",
                  description: "",
                  imageURL: "",
                });
                setIsAddModalOpen(true);
              }}
              className="btn btn-primary gap-2"
            >
              <FaPlus className="w-4 h-4" />
              Add Category
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
                      <th className="font-semibold border">Description</th>
                      <th className="font-semibold border">Category Name</th>
                      <th className="font-semibold border text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category, index) => (
                      <tr key={category._id} className="hover:bg-base-100">
                        <td className="border">{index + 1}</td>
                        <td className="border ">
                          <img
                            src={category.imageURL || "/placeholder-car.png"}
                            alt={category.name}
                            className="w-16 h-12 object-cover rounded-lg"
                          />
                        </td>
                        <td className="border font-medium">{category.name}</td>
                        <td className="border text-sm text-gray-600">
                          {category.description}
                        </td>
                        <td className="border text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEdit(category)}
                              className="btn btn-ghost btn-sm"
                              title="Edit"
                            >
                              <FaEdit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(category._id)}
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
            <div className="bg-base-100 rounded-lg p-6 w-full max-w-md">
              <h3 className="text-2xl font-bold">
                {isEditMode ? "Edit Category" : "Add New Category"}
              </h3>
              <div className="divider my-2"></div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">
                      Category Name
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
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
                    <span className="label-text font-medium">Description</span>
                  </label>
                  <textarea
                    placeholder="Enter category description"
                    className="textarea textarea-bordered w-full min-h-[100px]"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                  />
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

                <div className="flex justify-end gap-2 mt-4">
                  <button type="submit" className="btn btn-primary">
                    {isEditMode ? "Update Category" : "Add Category"}
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

export default AllCategories;
