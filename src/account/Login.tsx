import AccountService from './account.service'

function Login() {
  function login(formData:FormData) {
    AccountService.login(formData.get("userName")?.toString() ?? '', formData.get("password")?.toString() ?? '');
  }

  return (
        <>
            <h2>Login</h2>
            <form action={login}>
              <input title="userName" name="userName" />
              <input title="userName" name="password" type="password" />
              <button type="submit">Login</button>
            </form>
        </>
  )
}

export default Login
