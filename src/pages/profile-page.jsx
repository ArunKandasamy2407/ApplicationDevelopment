import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from "react-toastify";

export default function ProfilePage() {
  const { user, updateUser, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData); // Call updateUser with formData
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
    setIsEditing(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while user data is being fetched
  }

  return (
    <>
      <h1 className="text-3xl font-semibold mt-4">Profile</h1>
      {user && (
        <div className="flex flex-col items-center p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
          <div className="w-full space-y-4">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="w-full space-y-4">
                <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium w-1/3">Name:</span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-gray-800 w-2/3 p-2 rounded border border-gray-300"
                  />
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium w-1/3">
                    Username:
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="text-gray-800 w-2/3 p-2 rounded border border-gray-300"
                  />
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium w-1/3">
                    Email:
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-gray-800 w-2/3 p-2 rounded border border-gray-300"
                  />
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium w-1/3">
                    Phone:
                  </span>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="text-gray-800 w-2/3 p-2 rounded border border-gray-300"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium w-1/3">Name:</span>
                  <span className="text-gray-800 w-2/3">{user.name}</span>
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium w-1/3">
                    Username:
                  </span>
                  <span className="text-gray-800 w-2/3">{user.username}</span>
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium w-1/3">
                    Email:
                  </span>
                  <span className="text-gray-800 w-2/3">
                    {user.email ?? "N/A"}
                  </span>
                </div>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <span className="text-gray-600 font-medium w-1/3">
                    Phone:
                  </span>
                  <span className="text-gray-800 w-2/3">
                    {user.phone ?? "N/A"}
                  </span>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
