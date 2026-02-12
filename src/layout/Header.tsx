import AccountService from '../account/account.service'
import { useAuth } from '../account/AuthContext'
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleLogout = async () => {
    await AccountService.logout(auth);
    navigate('/', { replace: true });
  }

  return (
        <header>
            <h1><a href="/">EasyWorkout</a></h1>
            <nav className="horizontal-nav">
                <a href="/workouts">Workouts</a>
                <a href="/exercises">Exercises</a>
                <a href="/completed-workouts">Completed Workouts</a>
                <a href="/reports">Reports</a>
                <a href="/account">Account</a>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
  )
}

export default Header