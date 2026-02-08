import axios from 'axios';
import type { AuthContextType } from './AuthContext'

class AccountService {
  private baseUrl = `${import.meta.env.VITE_BASE_ACCOUNT_API_URL}/api/auth`;

  async login(userName:string, password:string, authContext: AuthContextType) {
    try {
        const res = await axios.post(`${this.baseUrl}/login`, { userName, password });
        // console.log('response', res);
        // console.log('setting tokens', res.data.accessToken, res.data.refreshToken);
        authContext.setTokens(res.data.accessToken, res.data.refreshToken);
    } catch (err) {
        console.error('error', err);
    }
  }
}

export default new AccountService()