import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../config/supabaseClient";



const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState(null);

  function handleChange(event) {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { email, password, username } = formData;

    if (!email || !password || !username) {
      alert("All fields are required.");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Check your email for verification.");
      // navigate('/login') or similar
    }
  }


  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <p>Fill up all details to create an account</p>

        <label>Username:</label>
        <input
          name="username"
          placeholder="Type your username here"
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          name="email"
          type="email"
          placeholder="Type your email here"
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          name="password"
          type="password"
          placeholder="Type your password here"
          onChange={handleChange}
        />

        <button type="submit">Sign up</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default Signup;
