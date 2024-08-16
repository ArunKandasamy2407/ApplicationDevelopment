import React from "react";
import Categories from "./Categories";
import ShopList from "./ShopList";

const HomePage = () => {
  return (
    <div>
      <Categories/>
      <h1 className="text-2xl font-bold mt-8 mb-4">All Shops</h1>
      <ShopList />
    </div>
  );
};

export default HomePage;
