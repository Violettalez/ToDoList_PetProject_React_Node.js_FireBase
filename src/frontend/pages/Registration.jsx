import { Link } from "react-router-dom";
function Registration() {
  return (
    <div className="flex justify-center items-center h-screen bg-bg1 bg-gradient-to-b from-text to-accent1">
      <div className="flex flex-col gap-4 items-center w-[90%] md:w-[25%] mx-auto bg-gradient-to-b from-accent1 to-text rounded-[20px] px-[40px] py-[30px]">
        <div className="bg-bg1 w-[30%] aspect-square p-0 rounded-full flex justify-center items-center">
          <img src="/persone.png" alt="Place for your photo" className="w-[100%]"/>
        </div>
        <input
          type="text"
          placeholder="Login"
          className="w-[100%] input font-rubik text-base"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-[100%] input font-rubik text-base"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-[100%] input font-rubik text-base"
        />
        <input
          type="password"
          placeholder="Confirm password"
          className="w-[100%] input font-rubik text-base"
        />
        <Link
          to="/"
          className="text-bg1 underline font-rubik text-base text-center"
        >
          Already have an account? Then login here.
        </Link>
        <button className="rounded-[20px] bg-accent1 hover:bg-bg2 py-3 w-[50%] text-text font-rubik text-base">
          Register
        </button>
      </div>
    </div>
  );
}
export default Registration;
