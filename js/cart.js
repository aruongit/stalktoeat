/* ============================================
   CART MANAGEMENT
   ============================================ */

const Cart = {
  items: [],

  init() {
    this.items = JSON.parse(localStorage.getItem('cart_items')) || [];
  },

  save() {
    localStorage.setItem('cart_items', JSON.stringify(this.items));
    this.updateUI();
  },

  add(item, restaurantId) {
    // If adding from a different restaurant, clear cart first (standard food app behavior)
    const currentRestId = localStorage.getItem('cart_restaurant_id');
    if (currentRestId && currentRestId !== restaurantId && this.items.length > 0) {
      if (!confirm('Start a new order? This will clear your current cart.')) return;
      this.clear();
    }

    localStorage.setItem('cart_restaurant_id', restaurantId);

    const existing = this.items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ ...item, quantity: 1 });
    }
    this.save();
  },

  remove(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
    if (this.items.length === 0) localStorage.removeItem('cart_restaurant_id');
    this.save();
  },

  updateQuantity(itemId, delta) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity += delta;
      if (item.quantity <= 0) this.remove(itemId);
      else this.save();
    }
  },

  clear() {
    this.items = [];
    localStorage.removeItem('cart_items');
    localStorage.removeItem('cart_restaurant_id');
    this.updateUI();
  },

  getTotal() {
    return this.items.reduce((sum, i) => {
      const price = i.discount ? i.price * (1 - i.discount / 100) : i.price;
      return sum + (price * i.quantity);
    }, 0);
  },

  getCount() {
    return this.items.reduce((sum, i) => sum + i.quantity, 0);
  },

  updateUI() {
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const count = this.getCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }
};

Cart.init();
