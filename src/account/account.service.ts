import axios from 'axios';

class AccountService {
  private baseUrl = `${import.meta.env.VITE_BASE_ACCOUNT_API_URL}/api/auth`;

  async login(userName:string, password:string) {
    try {
        const res = await axios.post(`${this.baseUrl}/login`, { userName, password });
        console.log('response', res);
    } catch (err) {
        console.error('error', err);
    }
  }
}

export default new AccountService()