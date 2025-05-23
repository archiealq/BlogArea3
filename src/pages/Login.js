import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";
import { Link } from "react-router-dom";

const Login = (setToken) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
      setToken(data)
      navigate("/home");
    }
  };

  return (
    <div className="page login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        
        <label>Password:</label>
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Log In</button>
      </form>

      <p>
        Don’t have an account? <Link to="/signup">Sign up here</Link>
      </p>
    </div>
  );
};

export default Login;
