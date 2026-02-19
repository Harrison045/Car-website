interface User {
  id: string;
  email: string;
  name: string;
  password: string; // In production, this would be hashed
  membershipTier: 'standard' | 'premium' | 'elite';
  joinDate: string;
  avatar?: string;
}

interface PublicUser {
  id: string;
  email: string;
  name: string;
  membershipTier: 'standard' | 'premium' | 'elite';
  joinDate: string;
  avatar?: string;
}

interface AuthResponse {
  success: boolean;
  user?: PublicUser;
  error?: string;
}

class AuthService {
  private users: User[] = [];
  private readonly STORAGE_KEY = 'lumina_users';
  private readonly SESSION_KEY = 'lumina_current_user';

  constructor() {
    this.loadUsers();
  }

  private loadUsers(): void {
    const storedUsers = localStorage.getItem(this.STORAGE_KEY);
    if (storedUsers) {
      try {
        this.users = JSON.parse(storedUsers);
      } catch (error) {
        console.error('Error loading users:', error);
        this.users = [];
      }
    }
  }

  private saveUsers(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
  }

  private hashPassword(password: string): string {
    // Simple hash for demo - in production, use bcrypt or similar
    let hash = 0;
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return btoa(hash.toString());
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePassword(password: string): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  async register(email: string, password: string, name: string): Promise<AuthResponse> {
    // Validate email format
    if (!this.validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Check if email already exists
    const existingUser = this.users.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Validate password
    const passwordValidation = this.validatePassword(password);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors.join(', ') };
    }

    // Validate name
    if (!name || name.trim().length < 2) {
      return { success: false, error: 'Name must be at least 2 characters long' };
    }

    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: email.toLowerCase().trim(),
      name: name.trim(),
      password: this.hashPassword(password),
      membershipTier: email.includes('premium') ? 'premium' : email.includes('elite') ? 'elite' : 'standard',
      joinDate: new Date().toISOString()
    };

    this.users.push(newUser);
    this.saveUsers();

    // Remove password from response
    const { password: _, ...publicUser } = newUser;
    
    return { success: true, user: publicUser };
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    // Validate email format
    if (!this.validateEmail(email)) {
      return { success: false, error: 'Invalid email format' };
    }

    // Find user by email
    const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      return { success: false, error: 'Email not found' };
    }

    // Verify password
    const hashedPassword = this.hashPassword(password);
    if (user.password !== hashedPassword) {
      return { success: false, error: 'Incorrect password' };
    }

    // Remove password from response
    const { password: _, ...publicUser } = user;
    
    // Store current session
    this.setCurrentUser(publicUser);

    return { success: true, user: publicUser };
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  getCurrentUser(): PublicUser | null {
    const currentUser = localStorage.getItem(this.SESSION_KEY);
    if (currentUser) {
      try {
        return JSON.parse(currentUser);
      } catch (error) {
        console.error('Error parsing current user:', error);
        this.logout();
        return null;
      }
    }
    return null;
  }

  setCurrentUser(user: PublicUser): void {
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  async updateProfile(updates: Partial<PublicUser>): Promise<AuthResponse> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'No user logged in' };
    }

    const userIndex = this.users.findIndex(u => u.id === currentUser.id);
    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    // Update user data
    this.users[userIndex] = { ...this.users[userIndex], ...updates };
    this.saveUsers();

    // Update current session
    const updatedUser = { ...this.users[userIndex] };
    const { password: _, ...publicUser } = updatedUser;
    this.setCurrentUser(publicUser);

    return { success: true, user: publicUser };
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<AuthResponse> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return { success: false, error: 'No user logged in' };
    }

    const user = this.users.find(u => u.id === currentUser.id);
    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify current password
    if (user.password !== this.hashPassword(currentPassword)) {
      return { success: false, error: 'Current password is incorrect' };
    }

    // Validate new password
    const passwordValidation = this.validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors.join(', ') };
    }

    // Update password
    user.password = this.hashPassword(newPassword);
    this.saveUsers();

    return { success: true };
  }
}

export const authService = new AuthService();
