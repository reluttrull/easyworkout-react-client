import axios from 'axios';
import type { AuthContextType } from './AuthContext'
import type { UserResponse, UpdateUserRequest, RegistrationRequest } from './interfaces';

class AccountService {
  private baseUrl = `${import.meta.env.VITE_BASE_ACCOUNT_API_URL}/api/auth`;

  async register(request:RegistrationRequest) {
      return await axios.post(`${this.baseUrl}/register`, request);
  }

  async login(userName:string, password:string) {
      return await axios.post(`${this.baseUrl}/login`, { userName, password });
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

  async update(firstName:string, lastName:string) {
    try {
      const request:UpdateUserRequest = { firstName: firstName, lastName: lastName };
      const res = await axios.put<UserResponse>(`${this.baseUrl}/me`, request);
      return res.data;
    } catch (err) {
      console.error('error', err);
    }
  }
}

export default new AccountService()