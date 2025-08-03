import { Link } from "react-router-dom";

function Autorization() {
  return (
    <div>
      <div className="flex flex-col items-center w-[25%] mx-auto mt-10 bg-amber-100 rounded-[20px] px-[40px] py-[30px]">
        <img src="/logo.png" alt="logo" className="w-[50%]" />
        <input type="text" placeholder="Login" className="w-[100%]" />
        <input type="password" placeholder="Password" className="w-[100%]" />
        <Link to="/registration">Don't have an account? Register here</Link>
        <button>Sign In</button>
      </div>
    </div>
  );
}
export default Autorization;
