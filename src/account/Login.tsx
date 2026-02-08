import AccountService from './account.service'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  
  const handleLogin = async (formData:FormData) => {
    var success = await AccountService.login(
      formData.get("userName")?.toString() ?? '', 
      formData.get("password")?.toString() ?? '',
    auth);
    if (success) navigate('/', { replace: true });
  }

  return (
        <>
            <h2>Login</h2>
            <form action={handleLogin}>
              <input title="userName" name="userName" />
              <input title="userName" name="password" type="password" />
              <button type="submit">Login</button>
            </form>
        </>
  )
}

export default Login
