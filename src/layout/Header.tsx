function Header() {

  return (
        <header>
            <h1><a href="/">EasyWorkout</a></h1>
            <nav className="horizontal-nav">
                <a href="workouts">Workouts</a>
                <a href="exercises">Exercises</a>
                <a href="completed-workouts">Completed Workouts</a>
                <a href="reports">Reports</a>
                <a href="account">Account</a>
            </nav>
        </header>
  )
}

export default Header