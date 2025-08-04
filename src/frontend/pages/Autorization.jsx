import { Link, useNavigate } from "react-router-dom";

function Autorization() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Logic for signing in goes here
    // After successful sign-in, navigate to home page
    navigate("/home");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-bg1 bg-gradient-to-b from-text to-accent1">
      <div className="flex flex-col gap-4 items-center w-[90%] md:w-[25%] mx-auto bg-gradient-to-b from-accent1 to-text rounded-[20px] px-[40px] py-[30px]">
        <img src="/logo.svg" alt="logo" className="w-[50%] logo-fil" />
        <input
          type="text"
          placeholder="Login"
          className="w-[100%] input font-rubik text-base"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[100%] input font-rubik text-base"
        />
        <Link
          to="/registration"
          className="text-bg1 underline font-rubik text-base text-center"
        >
          Don't have an account? Register here
        </Link>
        <button
          className="rounded-[20px] bg-accent1 hover:bg-bg2 py-3 w-[50%] text-text font-rubik text-base"
          onClick={handleSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}
export default Autorization;
