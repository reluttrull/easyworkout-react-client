import { useState } from 'react'
import AccountService from './account.service'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [isWaiting, setIsWaiting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  
  const handleLogin = async (formData:FormData) => {
    setIsWaiting(true);
    setValidationErrors([]);
    try {
      var response = await AccountService.login(
        formData.get("userName")?.toString() ?? '', 
        formData.get("password")?.toString() ?? '');
      auth.setTokens(response.data.accessToken, response.data.refreshToken);
      // success, navigate to homepage
      navigate('/', { replace: true });
    } catch (err:any) {
      // failure, display any validation errors
      console.log(err.response.data);
      if (err.response.data.message) {
        setValidationErrors(errs => [...errs, err.response.data.message]);
      } else {
        setValidationErrors(errs => [...errs, 'An unexpected error occurred.']);
      };
      setIsWaiting(false);
    }
  }

  return (
        <>
            <h2>Login</h2>
            <form action={handleLogin}>
              <input title="userName" name="userName" />
              <input title="userName" name="password" type="password" />
              <button type="submit">Login</button>
            </form>
            {isWaiting && <div>Loading...</div>}
            {validationErrors.map((error) => (
              <div className="error">{error}</div>
            ))}
            <div>Don't have an account? <a href="register">Register</a></div>
        </>
  )
}

export default Login
