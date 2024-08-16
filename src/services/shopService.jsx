// export const fetchShops = async () => {
//   const response = await fetch("/data/shops.json");
//   const data = await response.json();
//   return data;
// };

// export const fetchShopById = async (id) => {
//   const response = await fetch("/data/shops.json");
//   const data = await response.json();
//   return data.find((shop) => shop.id === id);
// };

export const fetchShops = async (
  sort = "",
  minRating = "",
  city = "",
  place = ""
) => {
  const queryParams = new URLSearchParams({
    sort,
    minRating,
    city,
    place,
  }).toString();
  const response = await fetch(
    `http://localhost:5000/api/shops?${queryParams}`
  );
  const data = await response.json();
  return data;
};
export const fetchShopById = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/api/shops/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch shop data');
    }
    const data = await response.json();
    console.log('Fetched shop data:', data); // Log fetched data
    return data;
  } catch (error) {
    console.error('Error fetching shop data:', error); // Log error
    return null;
  }
};