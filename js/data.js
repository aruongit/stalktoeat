


/* ============================================
   MOCK DATA - RESTAURANTS, MENUS, USERS
   ============================================ */

const DATA = {
  categories: [
    { id: 'burger', name: 'Burgers', icon: 'BG' },
    { id: 'pizza', name: 'Pizza', icon: 'PZ' },
    { id: 'sushi', name: 'Sushi', icon: 'SU' },
    { id: 'taco', name: 'Tacos', icon: 'TX' },
    { id: 'pasta', name: 'Pasta', icon: 'PA' },
    { id: 'salad', name: 'Salads', icon: 'SA' },
    { id: 'dessert', name: 'Desserts', icon: 'DS' },
    { id: 'drinks', name: 'Drinks', icon: 'DR' },
    { id: 'punjabi', name: 'Punjabi', icon: 'PB' },
    { id: 'street-food', name: 'Street Food', icon: 'SF' },
    { id: 'biryani', name: 'Biryani', icon: 'BY' },
    { id: 'indian', name: 'Indian', icon: 'IN' }
  ],

  restaurants: [
    {
      id: 'r1',
      name: 'Burger Kingz',
      category: 'burger',
      cuisine: 'American',
      rating: 4.8,
      reviews: 1200,
      deliveryTime: '20-30 min',
      priceRange: 'Mid-range',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800&q=80',
      description: 'Flame-grilled burgers, crisp sides, and shakes.',
      menu: [
        { id: 'm1', name: 'Classic Cheeseburger', price: 249, description: 'Beef patty, cheddar, lettuce, tomato, house sauce', category: 'Mains', discount: 15 },
        { id: 'm2', name: 'Bacon BBQ Burger', price: 299, description: 'Smoky bacon, BBQ sauce, onion rings, brioche bun', category: 'Mains', discount: null },
        { id: 'm3', name: 'Truffle Fries', price: 149, description: 'Crisp fries with truffle oil and parmesan', category: 'Sides', discount: 20 },
        { id: 'm4', name: 'Chocolate Shake', price: 129, description: 'Chocolate and vanilla ice cream blended smooth', category: 'Drinks', discount: null }
      ]
    },
    {
      id: 'r2',
      name: 'Pizza Napoletana',
      category: 'pizza',
      cuisine: 'Italian',
      rating: 4.9,
      reviews: 850,
      deliveryTime: '30-45 min',
      priceRange: 'Premium',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
      description: 'Wood-fired Neapolitan pizza with seasonal toppings.',
      menu: [
        { id: 'm5', name: 'Margherita', price: 329, description: 'Tomato sauce, fresh mozzarella, basil', category: 'Pizzas', discount: 10 },
        { id: 'm6', name: 'Diavola', price: 379, description: 'Spicy salami, chili flakes, tomato sauce', category: 'Pizzas', discount: null },
        { id: 'm7', name: 'Garlic Knots', price: 119, description: 'Buttery bread knots with fresh garlic', category: 'Sides', discount: 25 },
        { id: 'm8', name: 'Tiramisu', price: 199, description: 'Classic Italian coffee dessert', category: 'Dessert', discount: null }
      ]
    },
    {
      id: 'r3',
      name: 'Sushi Zen',
      category: 'sushi',
      cuisine: 'Japanese',
      rating: 4.7,
      reviews: 560,
      deliveryTime: '40-55 min',
      priceRange: 'Premium',
      image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
      description: 'Fresh sushi, sashimi, and Japanese comfort dishes.',
      menu: [
        { id: 'm9', name: 'Dragon Roll', price: 449, description: 'Shrimp tempura, eel, avocado, sweet soy', category: 'Rolls', discount: null },
        { id: 'm10', name: 'Salmon Sashimi', price: 349, description: 'Five pieces of Atlantic salmon', category: 'Sashimi', discount: 30 },
        { id: 'm11', name: 'Miso Soup', price: 99, description: 'Soy-based broth with tofu and scallions', category: 'Sides', discount: null }
      ]
    },
    {
      id: 'r4',
      name: 'Taco Loco',
      category: 'taco',
      cuisine: 'Mexican',
      rating: 4.5,
      reviews: 920,
      deliveryTime: '15-25 min',
      priceRange: 'Budget',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=800&q=80',
      description: 'Street tacos, bowls, and bright Mexican flavors.',
      menu: [
        { id: 'm12', name: 'Al Pastor Tacos', price: 219, description: 'Marinated pork, pineapple, onion, cilantro', category: 'Tacos', discount: 15 },
        { id: 'm13', name: 'Chips and Guac', price: 149, description: 'House-made guacamole with crisp tortilla chips', category: 'Sides', discount: null },
        { id: 'm14', name: 'Horchata', price: 99, description: 'Cinnamon rice milk drink', category: 'Drinks', discount: 20 }
      ]
    },
    {
      id: 'r5',
      name: 'Green Bowl Co.',
      category: 'salad',
      cuisine: 'Healthy',
      rating: 4.6,
      reviews: 430,
      deliveryTime: '18-28 min',
      priceRange: 'Mid-range',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80',
      description: 'Fresh salads, grain bowls, and cold-pressed drinks.',
      menu: [
        { id: 'm15', name: 'Harvest Grain Bowl', price: 259, description: 'Quinoa, roasted vegetables, feta, lemon tahini', category: 'Bowls', discount: null },
        { id: 'm16', name: 'Avocado Caesar', price: 239, description: 'Romaine, avocado, parmesan, crisp chickpeas', category: 'Salads', discount: 10 },
        { id: 'm17', name: 'Ginger Citrus Juice', price: 129, description: 'Orange, carrot, ginger, and lime', category: 'Drinks', discount: null }
      ]
    },
    {
      id: 'r6',
      name: 'Casa Pasta',
      category: 'pasta',
      cuisine: 'Italian',
      rating: 4.4,
      reviews: 690,
      deliveryTime: '25-40 min',
      priceRange: 'Mid-range',
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80',
      description: 'Handmade pasta and slow-simmered sauces.',
      menu: [
        { id: 'm18', name: 'Spaghetti Pomodoro', price: 289, description: 'San Marzano tomato, basil, parmesan', category: 'Pasta', discount: 20 },
        { id: 'm19', name: 'Creamy Pesto Penne', price: 329, description: 'Basil pesto, cream, toasted pine nuts', category: 'Pasta', discount: null },
        { id: 'm20', name: 'Lemon Ricotta Cake', price: 149, description: 'Light citrus cake with whipped ricotta', category: 'Dessert', discount: 15 }
      ]
    },
    {
      id: 'r7',
      name: 'Ludhiana Tandoor House',
      category: 'punjabi',
      cuisine: 'Punjabi',
      rating: 4.8,
      reviews: 980,
      deliveryTime: '20-35 min',
      priceRange: 'Mid-range',
      location: 'Sarabha Nagar, Ludhiana, Punjab',
      image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80',
      description: 'North Indian curries, tandoori breads, and Punjabi thalis in Ludhiana.',
      menu: [
        { id: 'm21', name: 'Butter Chicken Combo', price: 349, description: 'Butter chicken, naan, rice, salad, and chutney', category: 'Combos', discount: null },
        { id: 'm22', name: 'Paneer Tikka Masala', price: 289, description: 'Tandoori paneer in rich onion tomato gravy', category: 'Mains', discount: 25 },
        { id: 'm23', name: 'Amritsari Kulcha Plate', price: 179, description: 'Stuffed kulcha with chole, pickle, and curd', category: 'Mains', discount: 10 }
      ]
    },
    {
      id: 'r8',
      name: 'Model Town Chaat Co.',
      category: 'street-food',
      cuisine: 'Street Food',
      rating: 4.6,
      reviews: 740,
      deliveryTime: '15-25 min',
      priceRange: 'Budget',
      location: 'Model Town, Ludhiana, Punjab',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80',
      description: 'Crisp chaat, rolls, pav bhaji, and quick street-food favorites.',
      menu: [
        { id: 'm24', name: 'Papdi Chaat', price: 99, description: 'Papdi, curd, chutneys, sev, and masala', category: 'Chaat', discount: 30 },
        { id: 'm25', name: 'Paneer Kathi Roll', price: 129, description: 'Spiced paneer, onions, mint chutney, soft wrap', category: 'Rolls', discount: null },
        { id: 'm26', name: 'Pav Bhaji', price: 149, description: 'Buttery bhaji with toasted pav and onions', category: 'Mains', discount: 15 }
      ]
    },
    {
      id: 'r9',
      name: 'Civil Lines Biryani',
      category: 'biryani',
      cuisine: 'Biryani',
      rating: 4.7,
      reviews: 1120,
      deliveryTime: '25-40 min',
      priceRange: 'Mid-range',
      location: 'Civil Lines, Ludhiana, Punjab',
      image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=800&q=80',
      description: 'Aromatic biryani, kebabs, raita, and family meal boxes.',
      menu: [
        { id: 'm27', name: 'Chicken Dum Biryani', price: 269, description: 'Long-grain rice, tender chicken, raita, salan', category: 'Biryani', discount: 20 },
        { id: 'm28', name: 'Veg Biryani Box', price: 199, description: 'Seasonal vegetables, saffron rice, raita', category: 'Biryani', discount: null },
        { id: 'm29', name: 'Seekh Kebab', price: 189, description: 'Charred kebabs with mint chutney and onions', category: 'Starters', discount: 10 }
      ]
    },
    {
      id: 'r10',
      name: 'Tandoori Trails',
      category: 'indian',
      cuisine: 'Indian',
      rating: 4.8,
      reviews: 940,
      deliveryTime: '25-35 min',
      priceRange: 'Mid-range',
      location: 'Sector 7, Ludhiana, Punjab',
      image: 'https://images.unsplash.com/photo-1604908177522-31fc22e7c82f?w=800&q=80',
      description: 'Smoky tandoori flavors, curries, and classic North Indian platters.',
      menu: [
        { id: 'm30', name: 'Tandoori Chicken Thali', price: 359, description: 'Half tandoori chicken, naan, dal, salad, raita', category: 'Thalis', discount: 15 },
        { id: 'm31', name: 'Paneer Tikka Masala', price: 289, description: 'Charred paneer cubes in creamy tomato gravy', category: 'Mains', discount: 20 },
        { id: 'm32', name: 'Butter Naan', price: 69, description: 'Soft oven-baked naan with butter', category: 'Bread', discount: null }
      ]
    },
    {
      id: 'r11',
      name: 'Spice Bazaar',
      category: 'indian',
      cuisine: 'Indian',
      rating: 4.6,
      reviews: 780,
      deliveryTime: '30-40 min',
      priceRange: 'Budget',
      location: 'Ferozepur Road, Ludhiana, Punjab',
      image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=800&q=80',
      description: 'Vibrant street-style Indian dishes from chaats to biryani and kebabs.',
      menu: [
        { id: 'm33', name: 'Chicken Kathi Roll', price: 159, description: 'Spiced chicken, onions, chutney wrapped in paratha', category: 'Rolls', discount: 10 },
        { id: 'm34', name: 'Pav Bhaji Platter', price: 179, description: 'Buttery bhaji served with toasted pav and onions', category: 'Street Food', discount: 15 },
        { id: 'm35', name: 'Gulab Jamun', price: 89, description: 'Soft sweet dumplings soaked in rose syrup', category: 'Dessert', discount: null }
      ]
    }
  ],

  users: [
    { id: 'u1', name: 'John Doe', email: 'customer@example.com', role: 'customer', password: 'password' },
    { id: 'u2', name: 'Jane Smith', email: 'restaurant@example.com', role: 'restaurant', password: 'password', restaurantId: 'r1' },
    { id: 'u3', name: 'Admin User', email: 'admin@example.com', role: 'admin', password: 'password' }
  ],

  orders: [
    { id: 'ord1', userId: 'u1', restaurantId: 'r1', items: [{ id: 'm1', quantity: 2 }], total: 498, status: 'delivered', date: '2026-05-01' },
    { id: 'ord2', userId: 'u1', restaurantId: 'r2', items: [{ id: 'm5', quantity: 1 }], total: 329, status: 'preparing', date: '2026-05-08' }
  ]
};

// Persistence Helper
const Storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
  init: () => {
    const stored = Storage.get('app_data');
    const needsCurrencyRefresh = stored?.restaurants?.[0]?.menu?.[0]?.price !== DATA.restaurants[0].menu[0].price;
    if (!stored || stored.restaurants.length < DATA.restaurants.length || needsCurrencyRefresh) {
      Storage.set('app_data', DATA);
    }
  }
};

Storage.init();
const APP_DATA = Storage.get('app_data');
