import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Home from './home/Home'
import Workouts from './workouts/Workouts'
import Exercises from './exercises/Exercises'
import CompletedWorkouts from './completed-workouts/CompletedWorkouts'
import Reports from './reports/Reports'
import Account from './account/Account'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="workouts" element={<Workouts />} />
          <Route path="exercises" element={<Exercises />} />
          <Route path="completed-workouts" element={<CompletedWorkouts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="account" element={<Account />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
