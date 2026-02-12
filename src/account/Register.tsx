import { useState, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import type { RegistrationRequest } from './interfaces';
import AccountService from './account.service'

export const Register = () => {
  const navigate = useNavigate();
  const [isWaiting, setIsWaiting] = useState(false);
  const [formData, setFormData] = useState<RegistrationRequest>({
        userName: '',
        email: '',
        password: '',
        firstName: '',
        lastName: ''
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    const { title, value } = event.target;
    setFormData(prev => ({
        ...prev,
        [title]: value ? value : null
    }));
  }

  const handleChangeConfirmPassword = (event:ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  }
  const submitRegistration = async () => {
    setIsWaiting(true);
    setValidationErrors([]);
    if (formData.password != confirmPassword) {
      setValidationErrors(['Typed passwords do not match.']);
      setIsWaiting(false);
      return;
    }
    try {
      await AccountService.register(formData);
      // success, navigate to login
      navigate('/login', { replace: true });
    } catch (err:any) {
      // failure, display any validation errors
        console.log(err.response.data);
        if (err.response.data.status == 400 && err.response.data.errors) {
          const errors = err.response.data.errors;
          const formattedErrors = Object.keys(errors).flatMap(key =>
            errors[key].map((message: string) => `${key}: ${message}`)
          );
          setValidationErrors(formattedErrors);
        } else if (err.response.data.errors) {
          setValidationErrors(errs => [...errs, ...err.response.data.errors]);
        } else {
          setValidationErrors(errs => [...errs, 'An unexpected error occurred.']);
        };
        setIsWaiting(false);
    }
  }

  return (
        <>
          <h2>Register</h2>
          <form action={submitRegistration}>
            <div>
              <label htmlFor="userName">Username:</label>
              <input type="text" title="userName" value={formData.userName} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="text" title="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="firstName">First name:</label>
              <input type="text" title="firstName" value={formData.firstName ?? ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="lastName">Last name:</label>
              <input type="text" title="lastName" value={formData.lastName ?? ''} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input type="password" title="password" value={formData.password} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm password:</label>
              <input type="password" title="confirmPassword" value={confirmPassword} onChange={handleChangeConfirmPassword} />
            </div>
            {isWaiting && <div>Loading...</div>}
            <button type="submit">Create account</button>
          </form>
          {validationErrors.map((error) => (
            <div className="error">{error}</div>
          ))}
        </>
  )
}

export default Register
