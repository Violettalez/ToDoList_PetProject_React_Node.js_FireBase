import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { registerUser } from "../../backend/api";

function Registration() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    // Check if password meets all criteria
    if (password.length < minLength) {
      setError(`Password must be at least ${minLength} characters long.`);
      return false;
    } else if (!hasUpperCase) {
      setError("Password must contain at least one uppercase letter.");
      return false;
    } else if (!hasLowerCase) {
      setError("Password must contain at least one lowercase letter.");
      return false;
    } else if (!hasNumber) {
      setError("Password must contain at least one number.");
      return false;
    } else if (!hasSpecialChar) {
      setError("Password must contain at least one special character.");
      return false;
    }
    return (
      password.length >= minLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialChar
    );
  };
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Invalid email format");
      return false;
    }
  };
  const handleRegister = async () => {
    if (login.trim() === "") {
      setError("Login is required");
      return;
    }
    if (validateEmail(email) === false) {
      return;
    }
    if (validatePassword(password) === false) {
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      //await registerUser(login, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Error");
      alert(err);
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    }
  }, [error]);

  return (
    <div className="flex justify-center items-center h-screen bg-bg1 bg-gradient-to-b from-text to-accent1">
      <div className="flex flex-col gap-4 items-center w-[90%] md:w-[25%] mx-auto bg-gradient-to-b from-accent1 to-text rounded-[20px] px-[40px] py-[30px]">
        <div className="bg-bg1 w-[30%] aspect-square p-0 rounded-full flex justify-center items-center">
          <img
            src="/persone.png"
            alt="Place for your photo"
            className="w-[100%]"
          />
        </div>
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          className="w-[100%] input font-rubik text-base"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-[100%] input font-rubik text-base"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[100%] input font-rubik text-base"
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-[100%] input font-rubik text-base"
        />
        <Link
          to="/"
          className="text-bg1 underline font-rubik text-base text-center"
        >
          Already have an account? Then login here.
        </Link>
        <button
          onClick={handleRegister}
          className="rounded-[20px] bg-accent1 hover:bg-bg2 py-3 w-[50%] text-text font-rubik text-base"
        >
          Register
        </button>
      </div>
    </div>
  );
}
export default Registration;
