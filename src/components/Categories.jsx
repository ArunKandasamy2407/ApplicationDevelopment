import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Mobile",
    image: "/uploads/categories/mobile.jpg",
    path: "/category/mobile",
  },
  {
    name: "Laptop",
    image: "/uploads/categories/laptop.jpg",
    path: "/category/laptop",
  },
  {
    name: "Computer",
    image: "/uploads/categories/pc.jpg",
    path: "/category/computer",
  },
  {
    name: "Car",
    image: "/uploads/categories/car.jpg",
    path: "/category/car",
  },
  {
    name: "Home Appliances",
    image: "/uploads/categories/home-appliances.jpg",
    path: "/category/home-appliances",
  },
];

const Categories = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {categories.map((category) => (
        <Link
          key={category.name}
          to={category.path}
          className="border rounded-lg p-4"
        >
          <img
            src={`${import.meta.env.VITE_APP_API_URL}${category.image}`}
            alt={category.name}
            className="w-full h-32 object-cover mb-2"
          />
          <h2 className="text-lg font-bold text-center">{category.name}</h2>
        </Link>
      ))}
    </div>
  );
};

export default Categories;
