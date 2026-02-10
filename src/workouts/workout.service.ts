import axios from 'axios';
import type { WorkoutResponse, UpdateWorkoutRequest, CreateWorkoutRequest } from './interfaces'

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

  async create(name:string, notes:string|null) {
    const request: CreateWorkoutRequest = { name: name, notes: notes };
    try {
      const res = await axios.post(this.baseUrl, request);
      return res.data;
    } catch (err) {
      console.error('error', err);
      throw err;
    }
  }

  async delete(id:string) {
    try {
      const res = await axios.delete(`${this.baseUrl}/${id}`);
      return res.data;
    } catch (err) {
      console.error('error', err);
      throw err;
    }
  }
  
  async addExercise(workoutId:string, exerciseId:string) {
    try {
      const res = await axios.post(`${this.baseUrl}/${workoutId}/exercises/${exerciseId}`, {});
      return res.data;
    } catch (err) {
      console.error('error', err);
      throw err;
    }
  }
  
  async removeExercise(workoutId:string, exerciseId:string) {
    try {
      const res = await axios.delete(`${this.baseUrl}/${workoutId}/exercises/${exerciseId}`, {});
      return res.data;
    } catch (err) {
      console.error('error', err);
      throw err;
    }
  }
}

export default new WorkoutService()