/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";


const Signup = ({ handleToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!email.trim()) {
      errors.email = "Please enter an email address.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      errors.password = "Please enter a password.";
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        let data = {
          email,
          password,
        };
        data = JSON.stringify(data);
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:3000/signup",
          headers: {
            "Content-Type": "application/json",
          },
          data: data,
        };
        const response = await axios
            .request(config)
            .then((response) => { console.log(response.data.token);
              handleToken(response.data.token);
              navigate("/characters");}
        );
        console.log(response.data.token);
        handleToken(response.data.token);
        navigate("/characters");
      } catch (error) {
        console.log(error.response.status);
      }
    }
  };

  return (
    <div className="signup-container">
      <h1>S&apos;inscrire</h1>
      <form className="formulaire" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "error" : ""}
          />
        </div>
        {errors.email && <p className="error-message">{errors.email}</p>}

        <div className="form-group">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "error" : ""}
          />
        </div>
        {errors.password && <p className="error-message">{errors.password}</p>}

        <button className="btn-to-login" type="submit">
          S&apos;inscrire
        </button>
      </form>
      <p className="inscrire">
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </p>
    </div>
  );
};

export default Signup;
