import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    phone: "",
    photoURL: "",
    address: "",
  });

  // Handle profile update submission
  const handleUpdate = async () => {
    try {
      const userUpdateData = {
        displayName: formData.displayName,
        phone: formData.phone,
        photoURL: formData.photoURL,
        address: formData.address,
      };

      updateProfile(userUpdateData)
        .then(() => {
          // Show success toast with DaisyUI styling
          toast.success("Profile updated successfully!", {
            position: "top-center",
            style: {
              background: "#059669",
              color: "white",
              borderRadius: "1rem",
            },
          });
        })
        .catch((error) => {
          toast.error(`Update failed: ${error}`, {
            position: "top-center",
            style: {
              background: "#DC2626",
              color: "white",
              borderRadius: "1rem",
            },
          });
        });

      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Initialize edit modal with current user data
  const handleOpenEditModal = () => {
    setFormData({
      displayName: user.displayName || "",
      phone: user.phone || "",
      photoURL: user.photoURL || "",
      address: user.address || "",
    });
    setIsEditModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Profile</title>
      </Helmet>

      {/* Main profile card container */}
      <div className="min-h-screen  py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            {/* Profile header section */}
            <div className="card-body relative">
              {user?.isActive && (
                <button
                  className="btn btn-ghost btn-circle absolute top-4 right-4"
                  onClick={handleOpenEditModal}
                >
                  <FiEdit className="w-6 h-6" />
                </button>
              )}

              {/* Profile image and basic info */}
              <div className="flex flex-col items-center gap-4">
                <div className="avatar">
                  <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user?.photoURL || "/profile-placeholder.png"}
                      alt="Profile"
                    />
                  </div>
                </div>

                <div className="text-center">
                  <h2 className="text-2xl font-bold">{user?.displayName}</h2>
                  <p className="text-base-content/70">{user?.email}</p>
                  <div className="mt-2">
                    <span
                      className={`badge ${
                        user?.isActive ? "badge-success" : "badge-error"
                      } gap-2`}
                    >
                      {user?.isActive ? "Active" : "Blocked"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="divider">Profile Details</div>

              {/* Profile details grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="stats bg-base-200 shadow">
                  <div className="stat">
                    <div className="stat-title">Role</div>
                    <div className="stat-value text-sm font-semibold">
                      {user?.isAdmin ? "Admin" : "User"}
                    </div>
                  </div>
                </div>

                <div className="stats bg-base-200 shadow">
                  <div className="stat">
                    <div className="stat-title">Phone</div>
                    <div className="stat-value text-sm font-semibold">
                      {user?.phone || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="stats bg-base-200 shadow">
                  <div className="stat">
                    <div className="stat-title">Address</div>
                    <div className="stat-value text-sm font-semibold">
                      {user?.address || "N/A"}
                    </div>
                  </div>
                </div>

                <div className="stats bg-base-200 shadow">
                  <div className="stat">
                    <div className="stat-title">User ID</div>
                    <div className="stat-value text-sm font-semibold">
                      {user?.uid}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal using DaisyUI modal component */}
      {isEditModalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg m2-4">Edit Profile</h3>
            <div className="divider my-1"></div>
            <form className="space-y-1">
              <div className="form-control -mt-1">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.photoURL}
                  onChange={(e) =>
                    setFormData({ ...formData, photoURL: e.target.value })
                  }
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Address</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>
            </form>

            <div className="modal-action mt-2">
              <button className="btn btn-accent" onClick={handleUpdate}>
                Update
              </button>
              <button
                className="btn btn-error"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setIsEditModalOpen(false)}>close</button>
          </form>
        </dialog>
      )}
    </>
  );
};

export default Profile;
