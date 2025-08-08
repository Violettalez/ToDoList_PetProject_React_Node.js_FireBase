import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loginUser } from "../../backend/api";
import e from "cors";

function Autorization() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    /*const trimmedLogin = login.trim();
    const trimmedPassword = password.trim();
    if (!trimmedLogin) {
      setError("Login is required");
      alert("Login is required");
      return;
    }
    if (!trimmedPassword) {
      setError("Password is required");
      alert("Password is required");
      return;
    }
    if (validatePassword(trimmedPassword) === false) {
      return;
    }*/
    try {
      //const res = await loginUser(trimmedLogin, trimmedPassword);
      //localStorage.setItem("token", res.data.idToken);
      navigate("/home");
      console.clear();
      console.log("Login successful");
      setError(""); // Clear any previous error messages
    } catch (err) {
      let errMsg = "An error occurred. Please try again.";
      if (err.response?.status === 401) {
        errMsg = "Invalid login or password";
      } else if (err.response?.data?.error) {
        errMsg = err.response.data.error;
      }
      setError(errMsg);
      console.error("Login error:", errMsg);
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
        <img src="/logo.svg" alt="logo" className="w-[50%] logo-fil" />
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => {
            setLogin(e.target.value);
            console.log("Login: " + e.target.value);
          }}
          className="w-[100%] input font-rubik text-base"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-[100%] input font-rubik text-base"
        />
        <Link
          to="/registration"
          className="text-bg1 underline font-rubik text-base text-center"
        >
          Don't have an account? Register here
        </Link>
        <button
          onClick={handleLogin}
          className="rounded-[20px] bg-accent1 hover:bg-bg2 py-3 w-[50%] text-text font-rubik text-base"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
export default Autorization;
