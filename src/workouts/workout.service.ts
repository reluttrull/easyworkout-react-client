import axios from 'axios';
import type { AuthContextType } from '../account/AuthContext'
import type { WorkoutResponse } from './interfaces'

class WorkoutService {
  private baseUrl = `${import.meta.env.VITE_BASE_APP_API_URL}/api/workouts`;

  async getAllWorkouts(authContext:AuthContextType) : Promise<WorkoutResponse[]> {
    try {
        const res = await axios.get(`${this.baseUrl}/me`);
        return res.data;
    } catch (err) {
        console.error('error', err);
        throw err;
    }
  }
}

export default new WorkoutService()