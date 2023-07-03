import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [userState, setUserState] = useState(() => {
    const storedValue = localStorage.getItem("userLoginState");
    return storedValue ? JSON.parse(storedValue) : false;
  });

  useEffect(() => {
    localStorage.setItem("userLoginState", JSON.stringify(userState));
  }, [userState]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setUserState={setUserState} />} />
        {userState && (
          <Route path="/home" element={<Home setUserState={setUserState} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
