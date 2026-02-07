import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import PrivateRoute from './PrivateRoute'
import Home from './home/Home'
import Login from './account/Login'
import Workouts from './workouts/Workouts'
import Exercises from './exercises/Exercises'
import CompletedWorkouts from './completed-workouts/CompletedWorkouts'
import Reports from './reports/Reports'
import Account from './account/Account'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
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
