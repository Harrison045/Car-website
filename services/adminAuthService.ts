import axios from 'axios';

const API_BASE_URL = 'http://localhost:5050/api';

// Create axios instance with credentials
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AdminAuthResponse {
  success: boolean;
  token?: string;
  user?: AdminUser;
  error?: string;
}

class AdminAuthService {
  private readonly TOKEN_KEY = 'adminToken';

  private setCookie(name: string, value: string, days: number = 7): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }

  private getCookie(name: string): string | null {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  private deleteCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }

  async login(email: string, password: string): Promise<AdminAuthResponse> {
    try {
      const response = await apiClient.post('/login', { email, password });
      
      if (response.data.success && response.data.token) {
        this.setCookie(this.TOKEN_KEY, response.data.token);
        return { 
          success: true, 
          token: response.data.token, 
          user: response.data.user 
        };
      } else {
        return { 
          success: false, 
          error: response.data.message || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { 
        success: false, 
        error: 'Network error. Please try again.' 
      };
    }
  }

  logout(): void {
    this.deleteCookie(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return this.getCookie(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getCurrentAdmin(): AdminUser | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // For JWT tokens, you'd typically decode the token here
      // For now, return a basic admin user object
      return {
        id: 'admin',
        email: 'adminemail@gmail.com',
        name: 'Administrator',
        role: 'admin'
      };
    } catch (error) {
      console.error('Error decoding token:', error);
      this.logout();
      return null;
    }
  }

  getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    return token ? { 
      'Authorization': `Bearer ${token}` 
    } : {};
  }
}

export const adminAuthService = new AdminAuthService();
