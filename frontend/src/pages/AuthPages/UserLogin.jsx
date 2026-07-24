import { useState } from "react";
import { Link } from "react-router-dom";

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
    }
  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Enter your Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
        <button type="submit">Sign In</button>   
        New here <Link to="/register">Create an Account</Link>
      </form>
      <Link to="/rider-login">Sign in as Rider </Link>
    </div>
  )
}

export default UserLogin