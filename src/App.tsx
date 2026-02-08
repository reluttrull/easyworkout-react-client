import './App.css'
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './account/AuthContext'
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
  const [isAuthenticated] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="workouts" element={<Workouts />} />
              <Route path="exercises" element={<Exercises />} />
              <Route path="completed-workouts" element={<CompletedWorkouts />} />
              <Route path="reports" element={<Reports />} />
              <Route path="account" element={<Account />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
