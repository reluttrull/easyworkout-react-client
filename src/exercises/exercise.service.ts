import axios from 'axios';
import type { ExerciseResponse, UpdateExerciseRequest, CreateExerciseRequest } from './interfaces'

class ExerciseService {
  private baseUrl = `${import.meta.env.VITE_BASE_APP_API_URL}/api/exercises`;

  async getAllExercises() : Promise<ExerciseResponse[]> {
    try {
        const res = await axios.get(`${this.baseUrl}/me`);
        return res.data;
    } catch (err) {
        console.error('error', err);
        throw err;
    }
  }
  
  async update(exercise:ExerciseResponse): Promise<ExerciseResponse> {
    const request: UpdateExerciseRequest = { name: exercise.name, notes: exercise.notes };
    try {
      const res = await axios.put(`${this.baseUrl}/${exercise.id}`, request);
      return res.data;
    } catch (err) {
        console.error('error', err);
        throw err;
    }
  }

  async create(name:string, notes:string|null) {
    const request: CreateExerciseRequest = { name: name, notes: notes };
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
}

export default new ExerciseService()