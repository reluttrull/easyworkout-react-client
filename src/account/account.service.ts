import axios from 'axios';
import type { AuthContextType } from './AuthContext'
import type { UserResponse } from './interfaces';

class AccountService {
  private baseUrl = `${import.meta.env.VITE_BASE_ACCOUNT_API_URL}/api/auth`;

  async login(userName:string, password:string, authContext: AuthContextType) {
    try {
        const res = await axios.post(`${this.baseUrl}/login`, { userName, password });
        authContext.setTokens(res.data.accessToken, res.data.refreshToken);
        return true;
    } catch (err) {
        console.error('error', err);
        return false;
    }
  }

  async logout(authContext: AuthContextType) {
    try {
      await axios.delete(`${this.baseUrl}/revoke/${authContext.refreshToken}`);
      authContext.revoke();
    } catch (err) {
      console.error('error', err);
    }
  }

  async loadUser() {
    try {
      const res = await axios.get<UserResponse>(`${this.baseUrl}/me`);
      return res.data;
    } catch (err) {
      console.error('error', err);
      throw err;
    }
  }
}

export default new AccountService()