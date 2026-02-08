import AccountService from './account.service'
import { useAuth } from './AuthContext'

export const Login = () => {
  const auth = useAuth();
  
  const handleLogin = async (formData:FormData) => {
    await AccountService.login(
      formData.get("userName")?.toString() ?? '', 
      formData.get("password")?.toString() ?? '',
    auth);
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
