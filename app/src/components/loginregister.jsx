import RegisterForm from '../components/registerForm';
function LoginOrRegister() {
  return <div>
    <a href="/login">Login</a><br/>
    or<br/>
    <RegisterForm/>
  </div>
}

export { LoginOrRegister };
