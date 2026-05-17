/* ============================================
   PAGE RENDERERS
   ============================================ */

const Pages = {
  Home() {
    const featured = APP_DATA.restaurants.slice(0, 3);
    const categoriesHtml = APP_DATA.categories.map(c => `
      <button class="category-item" onclick="Router.go('#browse/${c.id}')">
        <span class="category-icon">${c.icon}</span>
        <span class="font-semibold text-sm">${c.name}</span>
      </button>
    `).join('');

    return `
      <section class="hero animate-fadeIn">
        <div class="container hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">Online food delivery</span>
            <h1 class="hero-title">Order from trusted restaurants with live delivery tracking.</h1>
            <p class="hero-subtitle">Browse menus, filter by cuisine, manage your cart, pay securely, and track every order from kitchen to doorstep.</p>
            <div class="hero-actions">
              <button class="btn btn-primary btn-lg" onclick="Router.go('#browse')">Start an Order</button>
              <button class="btn btn-secondary btn-lg" onclick="Router.go('#tracking/demo')">${Components.Icon('truck', 18)} Track Demo</button>
            </div>
          </div>
          <div class="hero-panel">
            <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=80" alt="Restaurant dishes ready for delivery">
            <div class="hero-status">
              <span class="badge badge-success">Kitchen accepted</span>
              <strong>25 min ETA</strong>
            </div>
          </div>
        </div>
      </section>

      <section class="container mt-2xl">
        <div class="discount-panel">
          <div>
            <span class="eyebrow">Customer offer</span>
            <h3>Flat 30% off on your first Ludhiana order</h3>
            <p>Use code <strong>LDH30</strong> at checkout. Valid on Punjabi, street food, biryani, and featured restaurants near Ludhiana, Punjab.</p>
          </div>
          <div class="discount-code">
            <span>LDH30</span>
            <button class="btn btn-primary" onclick="Router.go('#browse')">Claim Offer</button>
          </div>
        </div>
      </section>

      <section class="container mt-2xl">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Search by cuisine</span>
            <h3>Popular Categories</h3>
          </div>
          <a href="#browse" class="text-accent font-semibold flex items-center gap-xs">View all ${Components.Icon('chevronRight', 16)}</a>
        </div>
        <div class="categories-scroll">${categoriesHtml}</div>
      </section>

      <section class="container mt-2xl">
        <div class="section-heading">
          <div>
            <span class="eyebrow">Fast picks</span>
            <h3>Featured Restaurants</h3>
          </div>
        </div>
        <div class="grid grid-3">${featured.map(r => Components.RestaurantCard(r)).join('')}</div>
      </section>

      <section class="container mt-2xl mb-2xl">
        <div class="role-grid">
          <div class="role-card">
            ${Components.Icon('user', 24)}
            <h4>Customer</h4>
            <p>Browse restaurants, view menus, order food, pay securely, and track delivery.</p>
          </div>
          <div class="role-card">
            ${Components.Icon('menu', 24)}
            <h4>Restaurant</h4>
            <p>Manage menu items, accept orders, update preparation status, and monitor revenue.</p>
          </div>
          <div class="role-card">
            ${Components.Icon('shield', 24)}
            <h4>Admin</h4>
            <p>Manage users, onboard restaurants, review payments, and monitor system flows.</p>
          </div>
        </div>
      </section>

      <section class="container mt-2xl mb-2xl">
        <div class="feedback-panel">
          <div>
            <span class="eyebrow">Consumer feedback</span>
            <h3>Tell us about your delivery experience</h3>
            <p>Share food quality, packaging, delivery, or payment feedback so customer support can improve future orders.</p>
          </div>
          <form class="feedback-form" onsubmit="event.preventDefault(); alert('Thanks for your feedback!'); this.reset();">
            <select class="input-field" aria-label="Feedback topic">
              <option>Food quality</option>
              <option>Delivery experience</option>
              <option>Payment issue</option>
              <option>Restaurant service</option>
            </select>
            <textarea class="input-field" rows="3" placeholder="Write your feedback"></textarea>
            <button class="btn btn-primary" type="submit">Submit Feedback</button>
          </form>
        </div>
      </section>
    `;
  },

  Browse(categoryFilter = null) {
    const cuisines = [...new Set(APP_DATA.restaurants.map(r => r.cuisine))];
    const categoryOptions = APP_DATA.categories.map(c => `<option value="${c.id}" ${categoryFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('');
    const cuisineOptions = cuisines.map(c => `<option value="${c}">${c}</option>`).join('');

    return `
      <div class="container p-xl animate-fadeIn">
        <div class="browse-header">
          <div>
            <span class="eyebrow">Restaurant listing</span>
            <h2>Restaurants Near Ludhiana, Punjab</h2>
            <p>Discover local Punjabi meals, street food, biryani, and popular restaurants available for delivery.</p>
          </div>
          <div class="filter-bar">
            <label class="filter-control">
              <span>${Components.Icon('search', 16)}</span>
              <input id="browse-search" type="search" placeholder="Search dishes or restaurants" oninput="App.applyBrowseFilters()">
            </label>
            <select id="filter-cuisine" class="input-field" onchange="App.applyBrowseFilters()">
              <option value="">All cuisines</option>
              ${cuisineOptions}
            </select>
            <select id="filter-category" class="input-field" onchange="App.applyBrowseFilters()">
              <option value="">All categories</option>
              ${categoryOptions}
            </select>
            <select id="filter-price" class="input-field" onchange="App.applyBrowseFilters()">
              <option value="">Any price</option>
              <option value="Budget">Budget</option>
              <option value="Mid-range">Mid-range</option>
              <option value="Premium">Premium</option>
            </select>
            <select id="filter-rating" class="input-field" onchange="App.applyBrowseFilters()">
              <option value="0">Any rating</option>
              <option value="4.8">4.8+</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
            </select>
          </div>
        </div>
        <div id="browse-results" class="grid grid-3"></div>
      </div>
    `;
  },

  RestaurantDetail(id) {
    const restaurant = APP_DATA.restaurants.find(r => r.id === id);
    if (!restaurant) return '<div class="container p-xl"><h2>Restaurant not found</h2></div>';

    const menuGroups = {};
    restaurant.menu.forEach(item => {
      if (!menuGroups[item.category]) menuGroups[item.category] = [];
      menuGroups[item.category].push(item);
    });

    const menuHtml = Object.entries(menuGroups).map(([cat, items]) => `
      <h3 class="menu-section-title">${cat}</h3>
      <div class="grid grid-2">${items.map(item => Components.MenuItem(item, restaurant.id)).join('')}</div>
    `).join('');

    return `
      <div class="container p-xl animate-fadeIn">
        <div class="restaurant-banner">
          <img src="${restaurant.image}" alt="${restaurant.name}">
          <div class="restaurant-banner-overlay">
            <div>
              <span class="badge badge-primary">${restaurant.cuisine}</span>
              <h1 class="mb-sm">${restaurant.name}</h1>
              <div class="flex items-center gap-lg text-sm font-medium flex-wrap">
                <span class="flex items-center gap-sm">${Components.Icon('star', 16)} ${restaurant.rating} (${restaurant.reviews} reviews)</span>
                <span class="flex items-center gap-sm">${Components.Icon('clock', 16)} ${restaurant.deliveryTime}</span>
                <span>${restaurant.location || restaurant.priceRange}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="menu-container">${menuHtml}</div>
      </div>
    `;
  },

  Cart() {
    if (Cart.items.length === 0) {
      return `
        <div class="container p-3xl text-center animate-fadeIn">
          <div class="empty-icon">${Components.Icon('cart', 96)}</div>
          <h2>Your cart is empty</h2>
          <p class="mb-xl">Add a meal from any restaurant to begin checkout.</p>
          <button class="btn btn-primary" onclick="Router.go('#browse')">Browse Restaurants</button>
        </div>
      `;
    }

    const subtotal = Cart.getTotal();
    const deliveryFee = 49;
    const serviceFee = 19;
    const total = subtotal + deliveryFee + serviceFee;

    return `
      <div class="container p-xl animate-fadeIn">
        <h2 class="mb-xl">Your Cart</h2>
        <div class="cart-container">
          <div class="cart-items">${Cart.items.map(item => Components.CartItem(item)).join('')}</div>
          <aside class="cart-summary">
            <h4 class="mb-lg">Order Summary</h4>
            <div class="summary-row"><span>Subtotal</span><span>${Components.Price(subtotal)}</span></div>
            <div class="summary-row"><span>Delivery</span><span>${Components.Price(deliveryFee)}</span></div>
            <div class="summary-row"><span>Service fee</span><span>${Components.Price(serviceFee)}</span></div>
            <div class="summary-total"><span>Total</span><span>${Components.Price(total)}</span></div>
            <button class="btn btn-primary btn-full btn-lg" onclick="Router.go('#checkout')">${Components.Icon('shield', 18)} Secure Checkout</button>
          </aside>
        </div>
      </div>
    `;
  },

  Checkout() {
    return `
      <div class="container p-xl animate-fadeIn">
        <div class="checkout-layout">
          <section class="card p-xl">
            <span class="eyebrow">Secure payment gateway</span>
            <h2 class="mb-xl">Checkout</h2>
            <h4 class="mb-lg">Delivery Details</h4>
            <div class="input-group">
              <label class="input-label">Address</label>
              <input type="text" class="input-field" placeholder="123 Main St, Apartment 4B">
            </div>
            <div class="grid grid-2 mb-xl">
              <div class="input-group">
                <label class="input-label">City</label>
                <input type="text" class="input-field" placeholder="New York">
              </div>
              <div class="input-group">
                <label class="input-label">Zip Code</label>
                <input type="text" class="input-field" placeholder="10001">
              </div>
            </div>

            <h4 class="mb-lg">Payment Method</h4>
            <div class="payment-grid mb-xl">
              <button class="payment-option active">${Components.Icon('creditCard', 24)} <span>Card</span></button>
              <button class="payment-option">${Components.Icon('wallet', 24)} <span>Wallet</span></button>
              <button class="payment-option">${Components.Icon('home', 24)} <span>Cash</span></button>
            </div>
            <div class="grid grid-2 mb-xl">
              <div class="input-group">
                <label class="input-label">Card Number</label>
                <input type="text" class="input-field" placeholder="4242 4242 4242 4242">
              </div>
              <div class="input-group">
                <label class="input-label">Expiry / CVV</label>
                <input type="text" class="input-field" placeholder="08/28   123">
              </div>
            </div>
            <button class="btn btn-primary btn-full btn-lg" onclick="App.placeOrder()">Place Order</button>
          </section>
          <aside class="security-panel">
            ${Components.Icon('shield', 32)}
            <h4>Payment protected</h4>
            <p>Gateway verification, order confirmation, and payment status are captured before the kitchen receives the order.</p>
          </aside>
        </div>
      </div>
    `;
  },

  Tracking(orderId) {
    return `
      <div class="container p-xl animate-fadeIn">
        <div class="container--narrow text-center">
          <div class="badge badge-success mb-md">Order Confirmed</div>
          <h2 class="mb-sm">Delivery Tracking</h2>
          <p class="text-muted mb-2xl">Order ID: #${orderId || 'demo'} - ETA: 25 mins</p>
          <div class="card p-2xl">
            <div class="stepper">
              <div class="step completed"><div class="step-circle">${Components.Icon('check', 16)}</div><span class="step-label">Login</span></div>
              <div class="step completed"><div class="step-circle">${Components.Icon('check', 16)}</div><span class="step-label">Payment</span></div>
              <div class="step active"><div class="step-circle">3</div><span class="step-label">Preparing</span></div>
              <div class="step"><div class="step-circle">4</div><span class="step-label">On the way</span></div>
              <div class="step"><div class="step-circle">5</div><span class="step-label">Delivered</span></div>
            </div>
            <div class="delivery-card">
              <div class="delivery-avatar">${Components.Icon('truck', 24)}</div>
              <div>
                <h5 class="font-bold">Restaurant accepted your order</h5>
                <p class="text-sm text-muted">Courier assignment starts after kitchen preparation.</p>
              </div>
            </div>
          </div>
          <div class="mt-xl">
            <button class="btn btn-secondary" onclick="Router.go('#home')">Back to Home</button>
          </div>
        </div>
      </div>
    `;
  },

  Login() {
    return `
      <div class="container p-3xl animate-fadeIn">
        <div class="container--narrow auth-shell">
          <div class="card p-2xl">
            <span class="eyebrow">Role based access</span>
            <h2 class="mb-xl">Sign In</h2>
            <div class="input-group">
              <label class="input-label">Email</label>
              <input type="email" id="login-email" class="input-field" value="customer@example.com">
            </div>
            <div class="input-group">
              <label class="input-label">Password</label>
              <input type="password" id="login-password" class="input-field" value="password">
            </div>
            <button class="btn btn-primary btn-full mt-lg" onclick="App.handleLogin()">Login</button>
            <div class="demo-roles">
              <p class="text-xs text-muted text-center">Demo roles</p>
              <div class="flex gap-sm justify-center flex-wrap">
                <button class="btn btn-outline btn-sm" onclick="Auth.switchRole('customer')">Customer</button>
                <button class="btn btn-outline btn-sm" onclick="Auth.switchRole('restaurant')">Restaurant</button>
                <button class="btn btn-outline btn-sm" onclick="Auth.switchRole('admin')">Admin</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  RestaurantDashboard() {
    if (!Auth.hasRole('restaurant')) return '<h2>Unauthorized</h2>';
    const restaurant = APP_DATA.restaurants.find(r => r.id === Auth.currentUser.restaurantId);
    const menuRows = restaurant.menu.map(item => `
      <tr>
        <td>${item.name}</td>
        <td>${item.category}</td>
        <td>${Components.Price(item.price)}</td>
        <td><span class="badge badge-success">Active</span></td>
      </tr>
    `).join('');

    return `
      <div class="dashboard-layout">
        <aside class="sidebar">
          <a href="#dashboard" class="sidebar-link active">${Components.Icon('layout', 20)}<span class="sidebar-text">Dashboard</span></a>
          <a href="#dashboard" class="sidebar-link">${Components.Icon('menu', 20)}<span class="sidebar-text">Menu</span></a>
          <a href="#dashboard" class="sidebar-link">${Components.Icon('cart', 20)}<span class="sidebar-text">Orders</span></a>
          <div style="margin-top: auto"><button class="sidebar-link" onclick="Auth.logout()" style="width: 100%; border: none;">${Components.Icon('trash', 20)}<span class="sidebar-text">Logout</span></button></div>
        </aside>
        <main class="dashboard-content">
          <div class="flex justify-between items-center mb-2xl flex-wrap gap-md">
            <div><span class="eyebrow">Restaurant portal</span><h1>${restaurant.name}</h1></div>
            <button class="btn btn-primary">${Components.Icon('plus', 16)} Add Dish</button>
          </div>
          <div class="stats-grid">
            <div class="stat-card"><p class="text-muted">Revenue</p><div class="stat-value">Rs. 3,52,000</div><p class="text-success text-xs">12% up this month</p></div>
            <div class="stat-card"><p class="text-muted">Accepted Orders</p><div class="stat-value">158</div><p class="text-muted text-xs">8 pending review</p></div>
            <div class="stat-card"><p class="text-muted">Average Rating</p><div class="stat-value">${restaurant.rating}</div><p class="text-muted text-xs">${restaurant.reviews} reviews</p></div>
          </div>
          <div class="grid grid-2 dashboard-panels">
            <section>
              <h3 class="mb-lg">Incoming Orders</h3>
              <div class="table-container">
                <table>
                  <thead><tr><th>Order</th><th>Customer</th><th>Status</th><th>Total</th><th>Action</th></tr></thead>
                  <tbody>
                    <tr><td>#ORD-8821</td><td>John Doe</td><td><span class="badge badge-warning">New</span></td><td>Rs. 1,249</td><td><button class="btn btn-ghost btn-sm">Accept</button></td></tr>
                    <tr><td>#ORD-8820</td><td>Alice Smith</td><td><span class="badge badge-success">Preparing</span></td><td>Rs. 689</td><td><button class="btn btn-ghost btn-sm">Update</button></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h3 class="mb-lg">Menu Management</h3>
              <div class="table-container">
                <table>
                  <thead><tr><th>Dish</th><th>Category</th><th>Price</th><th>Status</th></tr></thead>
                  <tbody>${menuRows}</tbody>
                </table>
              </div>
            </section>
          </div>
        </main>
      </div>
    `;
  },

  AdminDashboard() {
    if (!Auth.hasRole('admin')) return '<h2>Unauthorized</h2>';

    return `
      <div class="dashboard-layout">
        <aside class="sidebar">
          <a href="#admin" class="sidebar-link active">${Components.Icon('layout', 20)}<span class="sidebar-text">Overview</span></a>
          <a href="#admin" class="sidebar-link">${Components.Icon('users', 20)}<span class="sidebar-text">Users</span></a>
          <a href="#admin" class="sidebar-link">${Components.Icon('home', 20)}<span class="sidebar-text">Restaurants</span></a>
          <a href="#admin" class="sidebar-link">${Components.Icon('wallet', 20)}<span class="sidebar-text">Payments</span></a>
          <div style="margin-top: auto"><button class="sidebar-link" onclick="Auth.logout()" style="width: 100%; border: none;">${Components.Icon('trash', 20)}<span class="sidebar-text">Logout</span></button></div>
        </aside>
        <main class="dashboard-content">
          <span class="eyebrow">Admin control center</span>
          <h1 class="mb-2xl">Platform Overview</h1>
          <div class="stats-grid">
            <div class="stat-card"><p class="text-muted">Gross Revenue</p><div class="stat-value">Rs. 1.04Cr</div></div>
            <div class="stat-card"><p class="text-muted">Active Users</p><div class="stat-value">12.4k</div></div>
            <div class="stat-card"><p class="text-muted">Restaurants</p><div class="stat-value">${APP_DATA.restaurants.length}</div></div>
            <div class="stat-card"><p class="text-muted">Payments Settled</p><div class="stat-value">98.7%</div></div>
          </div>

          <div class="grid grid-2 dashboard-panels">
            <section>
              <h3 class="mb-lg">Management Queues</h3>
              <div class="table-container">
                <table>
                  <thead><tr><th>Area</th><th>Items</th><th>Owner</th><th>Status</th></tr></thead>
                  <tbody>
                    <tr><td>Users</td><td>24 support reviews</td><td>Admin</td><td><span class="badge badge-warning">Open</span></td></tr>
                    <tr><td>Restaurants</td><td>6 onboarding checks</td><td>Admin</td><td><span class="badge badge-primary">Review</span></td></tr>
                    <tr><td>Payments</td><td>3 settlement exceptions</td><td>Finance</td><td><span class="badge badge-error">Action</span></td></tr>
                  </tbody>
                </table>
              </div>
            </section>
            <section>
              <h3 class="mb-lg">Standard DFD Notation</h3>
              <div class="dfd-legend">
                <span><i class="dfd-external sample"></i> External entity</span>
                <span><i class="dfd-process sample"></i> Process</span>
                <span><i class="dfd-store sample"></i> Data store</span>
                <span><i class="dfd-flow sample"></i> Data flow</span>
              </div>
              <div class="dfd-diagram" aria-label="Food delivery data flow diagram">
                <div class="dfd-node dfd-external customer">Customer</div>
                <div class="dfd-node dfd-external restaurant">Restaurant</div>
                <div class="dfd-node dfd-external admin">Admin</div>
                <div class="dfd-node dfd-process login">1.0<br>Login</div>
                <div class="dfd-node dfd-process browse">2.0<br>Browse Menu</div>
                <div class="dfd-node dfd-process order">3.0<br>Place Order</div>
                <div class="dfd-node dfd-process payment">4.0<br>Payment</div>
                <div class="dfd-node dfd-process tracking">5.0<br>Delivery Tracking</div>
                <div class="dfd-node dfd-store userdb">D1 User DB</div>
                <div class="dfd-node dfd-store menudb">D2 Menu DB</div>
                <div class="dfd-node dfd-store orderdb">D3 Order DB</div>
                <div class="dfd-line flow-a"></div>
                <div class="dfd-line flow-b"></div>
                <div class="dfd-line flow-c"></div>
                <div class="dfd-line flow-d"></div>
                <div class="dfd-line flow-e"></div>
                <div class="dfd-line flow-f"></div>
                <div class="dfd-line flow-g"></div>
              </div>
            </section>
          </div>
        </main>
      </div>
    `;
  }
};
