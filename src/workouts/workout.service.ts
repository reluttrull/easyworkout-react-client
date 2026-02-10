import axios from 'axios';
import type { WorkoutResponse, UpdateWorkoutRequest } from './interfaces'

class WorkoutService {
  private baseUrl = `${import.meta.env.VITE_BASE_APP_API_URL}/api/workouts`;

  async getAllWorkouts() : Promise<WorkoutResponse[]> {
    try {
        const res = await axios.get(`${this.baseUrl}/me`);
        return res.data;
    } catch (err) {
        console.error('error', err);
        throw err;
    }
  }

  async update(workout:WorkoutResponse): Promise<WorkoutResponse> {
    const request: UpdateWorkoutRequest = { name: workout.name, notes: workout.notes };
    try {
      const res = await axios.put(`${this.baseUrl}/${workout.id}`, request);
      return res.data;
    } catch (err) {
        console.error('error', err);
        throw err;
    }
  }
}

export default new WorkoutService()