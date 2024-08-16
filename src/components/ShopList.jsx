import React, { useEffect, useState } from "react";
import { fetchShops } from "../services/shopService";
import { Link, useParams } from "react-router-dom";
import { FlaskConicalIcon, LocateIcon, MapPin, StarIcon } from "lucide-react";
const ShopList = () => {
  const [shops, setShops] = useState([]);
  const { category } = useParams();
  const [sort, setSort] = useState("");
  const [minRating, setMinRating] = useState("");
  const [city, setCity] = useState("");
  const [place, setPlace] = useState("");
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const loadShops = async () => {
      const shopsData = await fetchShops(sort, minRating, city, place);
      if (category) {
        const filteredShops = shopsData.filter(
          (shop) => shop.category === category
        );
        setShops(filteredShops);
      } else {
        console.log(shopsData);
        setShops(shopsData);
      }
    };
    loadShops();
  }, [category, sort, minRating, city, place]);
  useEffect(() => {
    if (city) {
      const selectedCityShops = shops.filter((shop) => shop.city === city);
      const uniquePlaces = [
        ...new Set(selectedCityShops.map((shop) => shop.place)),
      ];
      setPlaces(uniquePlaces);
    } else {
      setPlaces([]);
    }
  }, [city, shops]);
  return (
    <div>
      {category && (
        <h1 className="text-2xl font-bold mb-4">Shops for {category}</h1>
      )}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <label
            htmlFor="sort"
            className="flex items-center text-gray-700 font-medium"
          >
            <FlaskConicalIcon className="w-5 h-5 text-gray-500" />
            <span className="ml-1">Sort by:</span>
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border rounded-lg py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <label
            htmlFor="minRating"
            className="flex items-center text-gray-700 font-medium"
          >
            <StarIcon className="w-5 h-5 text-gray-500" />
            <span className="ml-1">Min Rating:</span>
          </label>
          <select
            id="minRating"
            value={minRating}
            onChange={(e) => setMinRating(e.target.value)}
            className="border rounded-lg py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">None</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>

        {shops && (
          <>
            <div className="flex items-center space-x-2">
              <label
                htmlFor="city"
                className="flex items-center text-gray-700 font-medium"
              >
                <MapPin className="w-5 h-5 text-gray-500" />
                <span className="ml-1">City:</span>
              </label>
              <select
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border rounded-lg py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Cities</option>
                {Array.from(new Set(shops.map((shop) => shop.city))).map(
                  (city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="place"
                className="flex items-center text-gray-700 font-medium"
              >
                <LocateIcon className="w-5 h-5 text-gray-500" />
                <span className="ml-1">Place:</span>
              </label>
              <select
                id="place"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                disabled={!places.length}
                className="border rounded-lg py-2 px-3 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Places</option>
                {places.map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shops ? (
          shops?.map((shop) => (
            <div key={shop.id} className="border rounded-lg p-4">
              <img
                src={`${import.meta.env.VITE_APP_API_URL}/uploads/${
                  shop.profilePic
                }`}
                alt={shop.name}
                className="w-full h-32 object-cover mb-2"
              />
              <h2 className="text-lg font-bold">{shop.name}</h2>
              <p className="text-xs mb-2 text-gray-600">
                {shop.city}, {shop.place}
              </p>
              <p className="text-sm mb-2">{shop.description}</p>
              <div className="flex items-center">
                <span className="text-yellow-500 mr-2">⭐</span>
                <span>{shop.ratings}</span>
              </div>
              <Link
                to={`/shop/${shop.id}`}
                className="text-blue-500 mt-2 block"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p>No shops found</p>
        )}
      </div>
    </div>
  );
};

export default ShopList;
