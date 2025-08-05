import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../../backend/api";

function Autorization() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await loginUser(login, password);
      localStorage.setItem("token", res.data.idToken);
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-bg1 bg-gradient-to-b from-text to-accent1">
      <div className="flex flex-col gap-4 items-center w-[90%] md:w-[25%] mx-auto bg-gradient-to-b from-accent1 to-text rounded-[20px] px-[40px] py-[30px]">
        <img src="/logo.svg" alt="logo" className="w-[50%] logo-fil" />
        <input
          type="text"
          placeholder="Login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
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
          className="rounded-[20px] bg-accent1 hover:bg-bg2 py-3 w-[50%] text-text font-rubik text-base">
          Sign In
        </button>
      </div>
    </div>
  );
}
export default Autorization;