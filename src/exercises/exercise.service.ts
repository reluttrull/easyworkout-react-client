import axios from 'axios';
import type { AuthContextType } from '../account/AuthContext'
import type { ExerciseResponse } from './interfaces'

class ExerciseService {
  private baseUrl = `${import.meta.env.VITE_BASE_APP_API_URL}/api/exercises`;

  async getAllExercises(authContext:AuthContextType) : Promise<ExerciseResponse[]> {
    try {
        const res = await axios.get(`${this.baseUrl}/me`);
        return res.data;
    } catch (err) {
        console.error('error', err);
        throw err;
    }
  }
}

export default new ExerciseService()