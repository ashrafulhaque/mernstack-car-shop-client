import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { FaEdit, FaUserShield, FaSpinner } from "react-icons/fa";
import { ImBlocked } from "react-icons/im";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isAdminToggleModalOpen, setIsAdminToggleModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    address: "",
  });

  // Fetch all users from the backend
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://mernstack-car-shop-server.vercel.app/userList"
      );
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Load users when the component mounts
  }, []);

  // Block a user
  const handleBlock = async () => {
    try {
      console.log({ selectedUser });
      const updatedUser = {
        isActive: !selectedUser?.isActive,
      };
      console.log({ updatedUser });

      await fetch(
        `https://mernstack-car-shop-server.vercel.app/user/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      fetchUsers(); // Reload users after update
      setIsBlockModalOpen(false);
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  };

  // Toggle admin status
  const handleToggleAdmin = async () => {
    try {
      console.log({ selectedUser });
      const updatedUser = { isAdmin: !selectedUser?.isAdmin };

      await fetch(
        `https://mernstack-car-shop-server.vercel.app/user/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      fetchUsers(); // Reload users after update
      setIsAdminToggleModalOpen(false);
    } catch (error) {
      console.error("Error toggling admin status:", error);
    }
  };

  // Open the edit modal with the user's current details
  const openEditModal = (user) => {
    setSelectedUser(user);
    setFormData({
      displayName: user?.displayName || "",
      phone: user.phone || "",
      photoURL: user.photoURL || "/profile-placeholder.png",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  // Update user info
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        displayName: formData.displayName,
        phone: formData.phone,
        photoURL: formData.photoURL,
        address: formData.address,
      };

      await fetch(
        `https://mernstack-car-shop-server.vercel.app/user/${selectedUser._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );
      fetchUsers(); // Reload users after update
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleClickedSetBlock = (user) => {
    setSelectedUser(user);
    setIsBlockModalOpen(true);
  };
  const handleClickedSetUserOrAdminRole = (user) => {
    setSelectedUser(user);
    setIsAdminToggleModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | All Users</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <div className="bg-base-100 rounded-lg shadow-lg">
          <div className="p-6 border-b border-base-200">
            <h2 className="text-2xl font-bold">Users List</h2>
          </div>
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <FaSpinner className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="p-6">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr className="bg-base-200 text-gray-600 text-left text-sm">
                    <th className="py-2 px-4 border">#</th>
                    <th className="py-2 px-4 border">Name</th>
                    <th className="py-2 px-4 border">Email</th>
                    <th className="py-2 px-4 border">Image</th>
                    <th className="py-2 px-4 border">Role</th>
                    <th className="py-2 px-4 border">Status</th>
                    <th className="py-2 px-4 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-100">
                      <td className="py-2 px-4 border">{index + 1}</td>
                      <td className="py-2 px-4 border">
                        {user?.displayName || "N/A"}
                      </td>
                      <td className="py-2 px-4 border">{user?.email}</td>
                      <td className="py-2 px-4 border">
                        <img
                          src={user?.photoURL || "/profile-placeholder.png"}
                          alt="user"
                          className="w-10 h-10 rounded-full"
                        />
                      </td>
                      <td className="py-2 px-4 border">
                        {user.isAdmin ? "Admin" : "User"}
                      </td>
                      <td className="py-2 px-4 border">
                        {user.isActive ? "Active" : "Blocked"}
                      </td>
                      <td className="py-2 px-4 border">
                        <button
                          onClick={() => handleClickedSetUserOrAdminRole(user)}
                          className={`mr-2 p-2 rounded-full text-white ${
                            user.isAdmin ? "bg-green-500" : "bg-blue-500"
                          } ${
                            user.email === "super-admin@nfscarshop.com"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          title="Toggle Admin/User"
                          disabled={user.email === "super-admin@nfscarshop.com"}
                        >
                          <FaUserShield />
                        </button>

                        <button
                          onClick={() => openEditModal(user)}
                          className="mr-2 p-2 rounded-full bg-yellow-500 text-white"
                          title="Edit User"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleClickedSetBlock(user)}
                          className={`p-2 rounded-full bg-red-500 text-white ${
                            user.email === "super-admin@nfscarshop.com"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          title="Block User"
                          disabled={user.email === "super-admin@nfscarshop.com"}
                        >
                          <ImBlocked />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Edit Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h3 className="text-xl mb-4">Edit User</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium">Name:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Phone:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Photo URL:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium">Address:</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-2">
                <button onClick={handleUpdate} className="btn btn-accent py-2">
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="btn btn-error py-2"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Block Modal */}
        {isBlockModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h3 className="text-xl mb-4">
                {selectedUser.isActive
                  ? "Block this user?"
                  : "Unblock this user?"}
              </h3>
              <button
                onClick={handleBlock}
                className={`bg-red-500 text-white px-4 py-2 rounded ${
                  selectedUser.isActive ? "bg-green-500" : "bg-red-500"
                }`}
              >
                {selectedUser.isActive ? "Block" : "Unblock"}
              </button>
              <button
                onClick={() => setIsBlockModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Toggle Admin Modal */}
        {isAdminToggleModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h3 className="text-xl mb-4">
                {selectedUser.isAdmin
                  ? "Revoke Admin Privileges?"
                  : "Grant Admin Privileges?"}
              </h3>
              <button
                onClick={handleToggleAdmin}
                className={`bg-green-500 text-white px-4 py-2 rounded`}
              >
                {selectedUser.isAdmin ? "Revoke" : "Grant"}
              </button>
              <button
                onClick={() => setIsAdminToggleModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded ml-4"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default AllUsers;
