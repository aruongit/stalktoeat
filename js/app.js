/* ============================================
   CORE APPLICATION ENGINE (ROUTER & LOGIC)
   ============================================ */

const Router = {
  routes: {
    'home': Pages.Home,
    'browse': Pages.Browse,
    'restaurant': Pages.RestaurantDetail,
    'cart': Pages.Cart,
    'checkout': Pages.Checkout,
    'tracking': Pages.Tracking,
    'login': Pages.Login,
    'dashboard': Pages.RestaurantDashboard,
    'admin': Pages.AdminDashboard
  },

  init() {
    window.addEventListener('hashchange', () => this.handleRoute());
    this.handleRoute();
  },

  go(hash) {
    window.location.hash = hash;
  },

  handleRoute() {
    const hash = window.location.hash.slice(1) || 'home';
    const [path, param] = hash.split('/');
    
    // Auth Guard
    const protectedRoutes = ['checkout', 'dashboard', 'admin'];
    if (protectedRoutes.includes(path) && !Auth.isLoggedIn()) {
      this.go('#login');
      return;
    }

    // Role Guard
    if (path === 'dashboard' && !Auth.hasRole('restaurant')) { this.go('#home'); return; }
    if (path === 'admin' && !Auth.hasRole('admin')) { this.go('#home'); return; }

    const renderer = this.routes[path];
    const appContainer = document.getElementById('app');
    
    if (renderer) {
      // Logic for navbar visibility (hide on dashboards)
      const navbar = document.querySelector('.navbar');
      const isDashboard = ['dashboard', 'admin'].includes(path);
      if (navbar) navbar.style.display = isDashboard ? 'none' : 'block';
      if (appContainer) {
        // Param handle
        appContainer.innerHTML = renderer(param);
        window.scrollTo(0, 0);
        this.updateNavActive(path);
        if (path === 'browse') App.applyBrowseFilters(param);
      }
    } else {
      appContainer.innerHTML = '<h2>404 - Page Not Found</h2>';
    }
  },

  updateNavActive(path) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + path);
    });
  }
};

const App = {
  init() {
    Router.init();
    Cart.updateUI();
    this.updateAuthUI();
    this.bindGlobalSearch();
  },

  bindGlobalSearch() {
    const input = document.querySelector('.search-input');
    if (!input) return;
    input.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter') return;
      const query = input.value.trim();
      window.location.hash = '#browse';
      setTimeout(() => {
        const browseSearch = document.getElementById('browse-search');
        if (browseSearch) {
          browseSearch.value = query;
          this.applyBrowseFilters();
        }
      }, 0);
    });
  },

  updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
      if (Auth.isLoggedIn()) {
        const role = Auth.getRole();
        let target = '#home';
        if (role === 'restaurant') target = '#dashboard';
        if (role === 'admin') target = '#admin';
        
        authBtn.innerHTML = `
          <button class="btn btn-secondary" onclick="Router.go('${target}')">
            ${Components.Icon('user', 18)} 
            <span class="ml-sm">${Auth.currentUser.name}</span>
          </button>
        `;
      } else {
        authBtn.innerHTML = `
          <button class="btn btn-primary" onclick="Router.go('#login')">Sign In</button>
        `;
      }
    }
  },

  handleLogin() {
    const email = document.getElementById('login-email').value;
    const pass = document.getElementById('login-password').value;
    const res = Auth.login(email, pass);
    if (res.success) {
      this.updateAuthUI();
      Router.go('#home');
    } else {
      alert(res.message);
    }
  },

  placeOrder() {
    const orderId = Math.floor(100000 + Math.random() * 900000);
    Cart.clear();
    Router.go('#tracking/' + orderId);
  },

  applyBrowseFilters(categoryOverride = null) {
    const results = document.getElementById('browse-results');
    if (!results) return;

    const query = (document.getElementById('browse-search')?.value || '').trim().toLowerCase();
    const cuisine = document.getElementById('filter-cuisine')?.value || '';
    const category = categoryOverride || document.getElementById('filter-category')?.value || '';
    const price = document.getElementById('filter-price')?.value || '';
    const minRating = Number(document.getElementById('filter-rating')?.value || 0);

    if (categoryOverride && document.getElementById('filter-category')) {
      document.getElementById('filter-category').value = categoryOverride;
    }

    const filtered = APP_DATA.restaurants.filter(restaurant => {
      const searchableMenu = restaurant.menu.map(item => `${item.name} ${item.description}`).join(' ').toLowerCase();
      const textMatch = !query || `${restaurant.name} ${restaurant.description} ${restaurant.cuisine} ${searchableMenu}`.toLowerCase().includes(query);
      return textMatch
        && (!cuisine || restaurant.cuisine === cuisine)
        && (!category || restaurant.category === category)
        && (!price || restaurant.priceRange === price)
        && restaurant.rating >= minRating;
    });

    results.innerHTML = filtered.length
      ? filtered.map(r => Components.RestaurantCard(r)).join('')
      : '<div class="empty-state"><h3>No restaurants found</h3><p>Try clearing one filter or searching another dish.</p></div>';
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
