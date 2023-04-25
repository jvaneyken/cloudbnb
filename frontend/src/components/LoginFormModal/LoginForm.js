import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        let data;
        try {
          // .clone() essentially allows you to read the response body twice
          data = await res.clone().json();
        } catch {
          data = await res.text(); // Will hit this case if the server is down
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      });
  };

  const demoUserSubmit = () => {
    dispatch(sessionActions.login({credential: 'demo@user.io', password: 'password'}));
  }

  return (
    <>
    <div className="login-form-content">
      <h1>Log in or sign up</h1>
        <form onSubmit={handleSubmit}>
          <ul>
            {errors.map(error => <li key={error}>{error}</li>)}
          </ul>
          <label>
            
            <input 
              type="text"
              value={credential}
              placeholder="Username or email"
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            
            <input 
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit">Log In</button>
        </form>
        <button onClick={demoUserSubmit}>Log in with Demo Account</button>
    </div>
      
    </>

  );
}

export default LoginForm;