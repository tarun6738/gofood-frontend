import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setcredentials] = useState({
    email: "",
    password: ""
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    const url = "https://gofood-backend-sbj4.onrender.com";
    e.preventDefault();
    const response = await fetch(url + "/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    const json = await response.json();
    
    if (!json.success) {
      alert("Enter Valid Credentials");
    }
    else{
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken",json.authToken);
      
      navigate("/");
    }
  };
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
            />
          </div>
          
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/createuser" className="m-3 btn btn-danger">
            New user?
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
