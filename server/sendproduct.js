// sendproduct.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables
console.log('Mongo URI:', process.env.MONGO_URI); // Check if MONGO_URI is loaded correctly

const Product = require('./models/Product'); // Import the Product model

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');

    // Product data to insert
    const products = [
      
      {
        id: 4,
        name: "Cyberpunk 2077",
        description: "An open-world RPG set in a dystopian future, where technology and humanity clash.",
        price: 39.99,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSM0vv4cTvXHOMfYfmXSTPaasKG5HoqiDj4hlDizehQgBSBqzYX",
        platform: "PC"
      },
      {
        id: 5,
        name: "Far Cry Primal",
        description: "Get back to the pre ice age era.",
        price: 69.99,
        image: "https://upload.wikimedia.org/wikipedia/en/1/18/Far_Cry_Primal_cover_art.jpg",
        platform: "Xbox"
      },
      {
        id: 6,
        name: "Forza Horizon 5",
        description: "An open-world racing game that takes you across diverse landscapes in Mexico.",
        price: 49.99,
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSHuO5aX6VBDh6PnDsRfCW-aqqKXgCKEyW_Nw6ukIWXkzcq3e2G",
        platform: "Xbox"
      },
      {
        id: 7,
        name: "Animal Crossing: New Horizons",
        description: "Create your own island paradise and live life at your own pace.",
        price: 59.99,
        image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcS4wSmt_QLQcY7iUTo5geoTmaY2rYcPH2xEqf9-3wAeYho6UT2c",
        platform: "Nintendo"
      },
      {
        id: 8,
        name: "Red Dead Redemption 2",
        description: "A Western-themed action-adventure game set in a fictionalized version of the American Old West.",
        price: 49.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWmYkh80D5i2Rv7qgmZGQ-Q-I9Wj91nHR_gTIlgknSHMlLpmvQ",
        platform: "PC"
      },
      {
        id: 9,
        name: "Uncharted",
        description: "On the hunt for Captain Henry Avery's long-lost treasure, Sam and Drake set off to find Libertalia, the pirate utopia deep in the forests of Madagascar.",
        price: 59.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRib5Ba70vQKwNdOraos3rS8aat64d7yeYqKewBYXkNisebrjj-",
        platform: "PS5"
      },
      {
        id: 10,
        name: "Gears 5",
        description: "The world is crumbling. Humanity’s reliance on technology has become their downfall.",
        price: 39.99,
        image: "https://upload.wikimedia.org/wikipedia/en/e/e4/Gears_5_cover_art.png",
        platform: "Xbox"
      },
      {
        id: 11,
        name: "Assassin's Creed Valhalla",
        description: "Join Eivor, a Viking raider, as you explore a dynamic and beautiful open world.",
        price: 59.99,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf9_0MhcClESsULWWYalG-efy7DpBfC1v8B0rpotXU6VviTRW7",
        platform: "PC"
      },
      {
        id: 12,
        name: "Final Fantasy VII Remake",
        description: "Have game experience never before never after fight with every oponent and deaft them.",
        price: 49.99,
        image: "https://upload.wikimedia.org/wikipedia/en/c/ce/FFVIIRemake.png",
        platform: "PS5"
      },
      {
        id: 13,
        name: "Ghost of Tsushima",
        description: "Become the samurai warrior Jin Sakai and defend your home from the Mongol invasion.",
        price: 59.99,
        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSV98uvH4ix5WEiC98g5KVueyHqTi0kcMto1JfTihg291Ut_42d",
        platform: "PS5"
      },
      {
        id: 14,
        name: "Overwatch",
        description: "A team-based multiplayer first-person shooter with a diverse cast of heroes.",
        price: 39.99,
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcT9Yl_bv9aLDw9Pw3d_u8Rzkes-xLfxWCATdL5JlCKlaKRTBW8m",
        platform: "PC"
      },
      {
        id: 15,
        name: "Mortal Kombat 11",
        description: "The legendary fighting game returns with more brutal battles and iconic characters.",
        price: 59.99,
        image: "https://upload.wikimedia.org/wikipedia/en/7/7e/Mortal_Kombat_11_cover_art.png",
        platform: "Xbox"
      }
    ];

    // Insert products into the database
    Product.insertMany(products)
      .then((docs) => {
        console.log('Products inserted:', docs);
        mongoose.connection.close(); // Close the connection after insertion
      })
      .catch((error) => {
        console.error('Error inserting products:', error);
        mongoose.connection.close();
      });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
  });
