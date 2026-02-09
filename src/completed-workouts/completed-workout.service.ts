import axios from 'axios';
import type { CompletedWorkoutsResponse } from './interfaces'

class CompletedWorkoutService {
  private baseUrl = `${import.meta.env.VITE_BASE_APP_API_URL}/api/completed-workouts`;

  async getAllCompletedWorkouts() : Promise<CompletedWorkoutsResponse> {
    try {
        const res = await axios.get(`${this.baseUrl}/me`);
        return res.data;
    } catch (err) {
        console.error('error', err);
        throw err;
    }
  }
}

export default new CompletedWorkoutService()