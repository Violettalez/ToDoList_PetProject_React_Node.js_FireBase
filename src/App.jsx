import { Route, Routes, BrowserRouter } from "react-router-dom";
import Autorization from "./frontend/pages/Autorization";
import Registration from "./frontend/pages/Registration";
import Home from "./frontend/pages/Home";
function App() {
  return (
    <div className=" h-full bg-gradient-to-b from-bg1 to-accent1">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Autorization />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
// This code sets up a React application with routing using react-router-dom.
// It defines three routes: the root path ("/") for the Autorization page,
// "/registration" for the Registration page, and "/home" for the Home page.
// The BrowserRouter component is used to enable routing in the application.
