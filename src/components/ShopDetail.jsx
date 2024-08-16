import React, { useEffect, useState } from "react";
import { fetchShopById } from "../services/shopService";
import { useParams } from "react-router-dom";
import {
  Loader,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Star,
  Info,
  List,
  Image,
  CheckCircle,
} from "lucide-react";

const ShopDetail = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const loadShop = async () => {
      try {
        const shopData = await fetchShopById(parseInt(id));
        if (shopData) {
          setShop(shopData);
        } else {
          console.error('No shop data found');
        }
      } catch (error) {
        console.error('Error loading shop:', error);
      }
    };
    loadShop();
  }, [id]);
  if (!shop) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin" size={48} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
        {shop.name}
      </h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        {shop.description}
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <img
            src={`${import.meta.env.VITE_APP_API_URL}/uploads/${
              shop.profilePic
            }`}
            alt={shop.name}
            className="w-full h-64 object-cover rounded-lg shadow-md mb-4"
          />
          <div className="flex sm:flex-col w-full overflow-x-auto">
            {[
              { tab: "details", icon: <Info />, label: "Details" },
              { tab: "services", icon: <List />, label: "Services" },
              { tab: "photos", icon: <Image />, label: "Photos" },
            ].map(({ tab, icon, label }) => (
              <button
                key={tab}
                className={`flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 text-sm md:text-lg font-semibold rounded-lg ${
                  activeTab === tab
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700"
                } m-1`}
                onClick={() => setActiveTab(tab)}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-2/3 my-auto">
          {activeTab === "details" && (
            <div className="h-full space-y-2 p-4 rounded-lg border">
              <div className="flex items-center gap-2">
                <MapPin /> <strong>Address:</strong>{" "}
                <span className="truncate">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      shop.address
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shop.address}
                  </a>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone /> <strong>Phone:</strong>{" "}
                <span className="truncate">{shop.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail /> <strong>Email:</strong>{" "}
                <span className="truncate">
                  <a href={`mailto:${shop.email}`}>{shop.email}</a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock /> <strong>Timings:</strong>{" "}
                <span className="truncate">{shop.timings}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe /> <strong>Website:</strong>{" "}
                <a
                  href={shop.website}
                  className="text-blue-500 underline truncate"
                >
                  {shop.website}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Star /> <strong>Ratings:</strong>{" "}
                <span className="truncate">{shop.ratings}</span>
              </div>
            </div>
          )}
          {activeTab === "services" && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shop.services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 bg-white rounded-lg shadow-md"
                  >
                    <CheckCircle className="text-green-500 mr-2" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "photos" && (
            <div className="p-4 bg-gray-100 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">Photos</h2>
              <div className="flex overflow-x-scroll space-x-4">
                {shop.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={`${import.meta.env.VITE_APP_API_URL}/uploads/${photo}`}
                    alt={`Shop ${index + 1}`}
                    className="w-48 h-48 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopDetail;
