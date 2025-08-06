import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../backend/api";

function Registration() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await registerUser(login, email, password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-bg1 bg-gradient-to-b from-text to-accent1">
      <div className="flex flex-col gap-4 items-center w-[90%] md:w-[25%] mx-auto bg-gradient-to-b from-accent1 to-text rounded-[20px] px-[40px] py-[30px]">
        <div className="bg-bg1 w-[30%] aspect-square p-0 rounded-full flex justify-center items-center">
          <img src="/persone.png" alt="Place for your photo" className="w-[100%]"/>
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
          className="rounded-[20px] bg-accent1 hover:bg-bg2 py-3 w-[50%] text-text font-rubik text-base">
          Register
        </button>
      </div>
    </div>
  );
}
export default Registration;
