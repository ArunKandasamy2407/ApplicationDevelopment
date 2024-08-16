const sequelize = require("./config/db");
const Shop = require("./models/Shop");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const areas = [
  { place: "T. Nagar", city: "Chennai" },
  { place: "Adyar", city: "Chennai" },
  { place: "Koramangala", city: "Bangalore" },
  { place: "Whitefield", city: "Bangalore" },
  { place: "RS Puram", city: "Coimbatore" },
];
const categories = ["mobile", "laptop", "computer", "car", "home-appliances"];
const seedShops = async () => {
  try {
    const user = await User.findOne();
    console.log(user);
    const shops = [
      {
        name: "Shop 1",
        address: "123 Main St",
        phone: "123-456-7890",
        email: "shop1@example.com",
        profilePic: "/shop_images/ace.jpeg",
        services: ["Service 1", "Service 2"],
        timings: "9 AM - 6 PM",
        website: "http://shop1.com",
        ratings: "4.5",
        description: "Best shop in town.",
        photos: ["photo1.png", "photo2.png"],
        category: categories[0],
        place: areas[0].place,
        city: areas[0].city,
        ownerId: user.id,
      },
      {
        name: "Shop 2",
        address: "456 Market St",
        phone: "987-654-3210",
        email: "shop2@example.com",
        profilePic: "/shop_images/amaster.jpeg",
        services: ["Service 3", "Service 4"],
        timings: "10 AM - 7 PM",
        website: "http://shop2.com",
        ratings: "4.0",
        description: "Your favorite shop.",
        photos: ["photo3.png", "photo4.png"],
        category: categories[1],
        place: areas[1].place,
        city: areas[1].city,
        ownerId: user.id,
      },
      {
        name: "Shop 3",
        address: "789 Park Ave",
        phone: "456-789-0123",
        email: "shop3@example.com",
        profilePic: "/shop_images/compufix.jpg",
        services: ["Service 5", "Service 6"],
        timings: "8 AM - 5 PM",
        website: "http://shop3.com",
        ratings: "4.7",
        description: "We have it all.",
        photos: ["photo5.png", "photo6.png"],
        category: categories[2],
        place: areas[2].place,
        city: areas[2].city,
        ownerId: user.id,
      },
      {
        name: "Shop 4",
        address: "321 High St",
        phone: "654-321-0987",
        email: "shop4@example.com",
        profilePic: "/shop_images/comwizard.jpeg",
        services: ["Service 7", "Service 8"],
        timings: "11 AM - 8 PM",
        website: "http://shop4.com",
        ratings: "4.3",
        description: "The best deals in town.",
        photos: ["photo7.png", "photo8.png"],
        category: categories[3],
        place: areas[3].place,
        city: areas[3].city,
        ownerId: user.id,
      },
      {
        name: "Shop 5",
        address: "555 Elm St",
        phone: "321-654-9870",
        email: "shop5@example.com",
        profilePic: "/shop_images/ftrack.jpeg",
        services: ["Service 9", "Service 10"],
        timings: "7 AM - 4 PM",
        website: "http://shop5.com",
        ratings: "4.8",
        description: "Quality products guaranteed.",
        photos: ["photo9.png", "photo10.png"],
        category: categories[4],
        place: areas[4].place,
        city: areas[4].city,
        ownerId: user.id,
      },
    ];

    for (const shop of shops) {
      await Shop.create(shop);
    }

    console.log("Data has been seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await sequelize.close();
  }
};
async function seedUsers() {
  try {
    const users = [
      {
        name: "John",
        username: "john",
        email: "example1@mail.com",
        password: await bcrypt.hash("password", 10),
      },
    ];
    for (const user of users) {
      await User.create(user);
    }
    console.log("Data has been seeded successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
}

async function main() {
  await sequelize.sync({ force: true }); // Drops and re-creates tables

  await seedUsers();
  await seedShops();
}

main();
