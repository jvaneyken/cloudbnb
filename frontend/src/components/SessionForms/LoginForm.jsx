import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { NavLink, useLocation, useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
    .then(() => {
      setRedirect(true);
    })
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
    setRedirect(true);
  }

  if (redirect) {
    const { from } = location.state || { from: { pathname: '/' }};
    history.replace(from);
  }

  return (
    <>
      <div className="login-form-content">
        <h1>Log in</h1>
          <form onSubmit={handleSubmit}>
            <ul className="errors-ul">
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
            <button id="login-button" type="submit">Log In</button>
          </form>
          <button id="demo-button" onClick={demoUserSubmit}>Log in with Demo Account</button>
          <div><NavLink to='/signup'><span id="signup-span" >Sign Up</span></NavLink> instead?</div>
      </div>      
    </>
  );
}

export default LoginForm;