/* ============================================
   AUTHENTICATION & ROLE MANAGEMENT
   ============================================ */

const Auth = {
  currentUser: null,

  init() {
    this.currentUser = JSON.parse(localStorage.getItem('auth_user')) || null;
  },

  login(email, password) {
    const user = APP_DATA.users.find(u => u.email === email && u.password === password);
    if (user) {
      this.currentUser = { ...user };
      delete this.currentUser.password; // Don't store password in memory
      localStorage.setItem('auth_user', JSON.stringify(this.currentUser));
      return { success: true, user: this.currentUser };
    }
    return { success: false, message: 'Invalid credentials' };
  },

  logout() {
    this.currentUser = null;
    localStorage.removeItem('auth_user');
    window.location.hash = '#home';
    location.reload();
  },

  isLoggedIn() {
    return !!this.currentUser;
  },

  getRole() {
    return this.currentUser ? this.currentUser.role : 'guest';
  },

  hasRole(role) {
    return this.getRole() === role;
  },

  switchRole(role) {
    // Demo convenience: find first user with that role and login
    const user = APP_DATA.users.find(u => u.role === role);
    if (user) {
      this.login(user.email, user.password);
      window.location.hash = '#home';
      location.reload();
    }
  }
};

Auth.init();
