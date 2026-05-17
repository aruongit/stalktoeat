/* ============================================
   REUSABLE UI COMPONENTS (GENERATORS)
   ============================================ */

const Components = {
  Price(amount) {
    return `Rs. ${Math.round(amount).toLocaleString('en-IN')}`;
  },

  Icon(name, size = 20) {
    const attrs = `width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
    const icons = {
      search: `<svg ${attrs}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
      cart: `<svg ${attrs}><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
      star: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
      clock: `<svg ${attrs}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
      user: `<svg ${attrs}><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
      chevronRight: `<svg ${attrs}><polyline points="9 18 15 12 9 6"></polyline></svg>`,
      plus: `<svg ${attrs}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
      minus: `<svg ${attrs}><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
      trash: `<svg ${attrs}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,
      home: `<svg ${attrs}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
      layout: `<svg ${attrs}><rect x="3" y="3" width="18" height="18" rx="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg>`,
      menu: `<svg ${attrs}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`,
      users: `<svg ${attrs}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      creditCard: `<svg ${attrs}><rect x="1" y="4" width="22" height="16" rx="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>`,
      shield: `<svg ${attrs}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
      truck: `<svg ${attrs}><path d="M10 17h4V5H2v12h3"></path><path d="M14 8h4l4 4v5h-3"></path><circle cx="7.5" cy="17.5" r="2.5"></circle><circle cx="16.5" cy="17.5" r="2.5"></circle></svg>`,
      wallet: `<svg ${attrs}><path d="M20 7V6a2 2 0 0 0-2-2H5a3 3 0 0 0 0 6h15v9a2 2 0 0 1-2 2H5a3 3 0 0 1-3-3V7"></path><path d="M16 14h.01"></path></svg>`,
      filter: `<svg ${attrs}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>`,
      check: `<svg ${attrs}><path d="M20 6 9 17l-5-5"></path></svg>`
    };
    return icons[name] || '';
  },

  RestaurantCard(restaurant) {
    return `
      <article class="card restaurant-card hover-lift" onclick="Router.go('#restaurant/${restaurant.id}')">
        <img src="${restaurant.image}" alt="${restaurant.name}" class="card-img">
        <div class="card-body">
          <div class="flex justify-between items-start gap-md mb-sm">
            <div>
              <h4 class="card-title">${restaurant.name}</h4>
              <p class="text-xs text-muted">${restaurant.location || `${restaurant.cuisine} cuisine`}</p>
            </div>
            <div class="rating-pill">${this.Icon('star', 13)} ${restaurant.rating}</div>
          </div>
          <p class="text-sm mb-md">${restaurant.description}</p>
          <div class="restaurant-meta">
            <span>${this.Icon('clock', 14)} ${restaurant.deliveryTime}</span>
            <span>${restaurant.priceRange}</span>
            <span class="badge badge-primary">${restaurant.category}</span>
          </div>
        </div>
      </article>
    `;
  },

  MenuItem(item, restaurantId) {
    const discountPanel = item.discount ? `<div class="discount-panel">${item.discount}% OFF</div>` : '';
    const originalPrice = item.discount ? `<span class="original-price">${this.Price(item.price)}</span>` : '';
    const discountedPrice = item.discount ? this.Price(item.price * (1 - item.discount / 100)) : this.Price(item.price);
    
    return `
      <div class="cart-item menu-item-row">
        <div style="flex: 1">
          <h5 class="font-bold mb-xs">${item.name}</h5>
          <p class="text-xs mb-sm">${item.description}</p>
          <div class="price-container">
            ${discountPanel}
            <div class="price-info">
              ${originalPrice}
              <span class="font-bold text-accent discounted-price">${discountedPrice}</span>
            </div>
          </div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="Cart.add(${JSON.stringify(item).replace(/"/g, '&quot;')}, '${restaurantId}')">
          ${this.Icon('plus', 16)} Add
        </button>
      </div>
    `;
  },

  CartItem(item) {
    const price = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return `
      <div class="cart-item">
        <div style="flex: 1">
          <h5 class="font-bold mb-xs">${item.name}</h5>
          <span class="font-bold text-accent">${this.Price(price)}</span>
        </div>
        <div class="flex items-center gap-md">
          <div class="quantity-control">
            <button class="btn btn-ghost btn-sm" onclick="Cart.updateQuantity('${item.id}', -1)" aria-label="Decrease quantity">${this.Icon('minus', 14)}</button>
            <span class="font-bold">${item.quantity}</span>
            <button class="btn btn-ghost btn-sm" onclick="Cart.updateQuantity('${item.id}', 1)" aria-label="Increase quantity">${this.Icon('plus', 14)}</button>
          </div>
          <button class="btn btn-ghost text-error" onclick="Cart.remove('${item.id}')" aria-label="Remove item">${this.Icon('trash', 18)}</button>
        </div>
      </div>
    `;
  },

  SectionTitle(title) {
    return `<h2 class="menu-section-title">${title}</h2>`;
  }
};
