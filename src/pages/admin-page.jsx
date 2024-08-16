import React, { useEffect, Fragment, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  Transition,
} from "@headlessui/react";
import { XIcon } from "lucide-react";
import "./AdminPage.css"; // Custom styles for better appearance
import { toast } from "react-toastify";

export default function AdminPage() {
  const [shops, setShops] = useState([]);
  const { loading, user } = useAuth();
  const [contentLoading, setContentLoading] = useState(true);
  const [openNew, setOpenNew] = useState(false);
  const [shopData, setShopData] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    services: "",
    timings: "9:00 AM - 5:00 PM",
    website: "",
    ratings: "",
    photos: [],
    profilePic: null,
    category: "mobile",
    place: "",
    city: "",
  });

  const fetchShops = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/api/shops");
      if (!res.ok) throw new Error("Failed to fetch shops");
      const data = await res.json();
      setShops(data || []);
      setContentLoading(false);
    } catch (error) {
      toast.error("Failed to fetch shops");
      setContentLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && user) {
      fetchShops();
    }
  }, [loading, user]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        import.meta.env.VITE_APP_API_URL + `/api/shops/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.ok) {
        fetchShops();
        toast.success("Shop deleted successfully");
      } else {
        toast.error("Failed to delete shop");
      }
    } catch (error) {
      toast.error("Failed to delete shop");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setShopData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setShopData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePhotoAdd = () => {
    setShopData((prev) => ({
      ...prev,
      photos: [...prev.photos, ""],
    }));
  };

  const handlePhotoChange = (index, e) => {
    const newPhotos = [...shopData.photos];
    newPhotos[index] = e.target.files[0];
    setShopData((prev) => ({ ...prev, photos: newPhotos }));
  };

  const handlePhotoRemove = (index) => {
    const newPhotos = shopData.photos.filter((_, i) => i !== index);
    setShopData((prev) => ({ ...prev, photos: newPhotos }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(shopData).forEach((key) => {
      if (key === "photos" && Array.isArray(shopData[key])) {
        shopData[key].forEach((file) => formData.append("photos", file));
      } else {
        formData.append(key, shopData[key] || "");
      }
    });
  
    try {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/api/shops", {
        method: "POST",
        body: formData,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (res.ok) {
        fetchShops();
        setOpenNew(false);
        toast.success("Shop added successfully");
      } else {
        toast.error("Failed to add shop");
      }
    } catch (error) {
      toast.error("Failed to add shop");
    }
  };

  if (loading || contentLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button
        onClick={() => setOpenNew(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Add New Shop
      </button>
      <SlideOver open={openNew} setOpen={setOpenNew} title="Add New Shop">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Profile Picture:
            </label>
            <input
              type="file"
              name="profilePic"
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          {[
            "Name",
            "Description",
            "Address",
            "Phone",
            "Email",
            "Services",
            "Website",
            "Ratings",
            "City",
            "Place",
          ].map((label, index) => (
            <div key={index} className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">
                {label}:
              </label>
              <input
                type="text"
                name={label.toLowerCase()}
                value={shopData[label.toLowerCase()] || ""}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          {/* timings as select values  */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Timings:
            </label>
            <select
              name="timings"
              onChange={handleChange}
              className="mt-1 p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[
                "9:00 AM - 5:00 PM",
                "10:00 AM - 6:00 PM",
                "11:00 AM - 7:00 PM",
                "12:00 PM - 8:00 PM",
              ].map((timing) => (
                <option
                  key={timing}
                  value={timing}
                  selected={shopData.timings === timing}
                >
                  {timing}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Category:
            </label>
            <select
              name="category"
              onChange={handleChange}
              className="mt-1 p-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["Mobile", "Laptop", "Computer", "Car", "Home Appliances"].map(
                (category) => (
                  <option
                    key={category}
                    value={category.toLowerCase().replace(" ", "-")}
                    selected={shopData.category === category}
                  >
                    {category}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Photos:</label>
            {shopData.photos.map((photo, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <input
                  type="file"
                  name="photos"
                  onChange={(e) => handlePhotoChange(index, e)}
                  className="border border-gray-300 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handlePhotoRemove(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handlePhotoAdd}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Add More Photos
            </button>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            Add Shop
          </button>
        </form>
      </SlideOver>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-md">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Shop Name",
                "Address",
                "Phone",
                "Email",
                "Services",
                "Timings",
                "Website",
                "Ratings",
                "Photos",
                "Category",
                "Place",
                "City",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {shops && shops.length ? (
              shops.map((shop) => (
                <tr key={shop.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {shop.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.address || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.phone || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {Array.isArray(shop.services)
                      ? shop.services.join(", ")
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.timings || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.website || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.ratings || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.photos ? shop.photos.join(", ") : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.category || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.place || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {shop.city || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDelete(shop.id)}
                      className="ml-4 text-red-600 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="13" className="text-center py-4">
                  No shops found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

const SlideOver = ({ open, setOpen, children, title }) => {
  return (
    <Transition show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md bg-white shadow-lg rounded-lg">
                  <div className="flex flex-col h-full overflow-y-auto">
                    <div className="flex items-start justify-between p-6 border-b border-gray-200">
                      <DialogTitle className="text-lg font-semibold text-gray-900">
                        {title}
                      </DialogTitle>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={() => setOpen(false)}
                      >
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="p-6">{children}</div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
