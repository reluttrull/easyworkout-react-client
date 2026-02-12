import axios from 'axios';
import type { CompletedWorkoutsResponse, CompletedWorkoutResponse, UpdateCompletedWorkoutRequest, FinishWorkoutRequest } from './interfaces'

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

  async update(id:string, notes?:string|null) : Promise<CompletedWorkoutResponse> {
    try {
      const request:UpdateCompletedWorkoutRequest = { completedNotes: notes };
      const res = await axios.put(`${this.baseUrl}/${id}`, request);
      return res.data;
    } catch (err) {
      console.error('error', err);
      throw err;
    }
  }

  async finishWorkout(request:FinishWorkoutRequest) {
    try {
      const res = await axios.post(`${this.baseUrl}`, request);
      return res.data;
    } catch (err) {
      console.error('error in finishWorkout', err);
      throw err;
    }
  }
}

export default new CompletedWorkoutService()