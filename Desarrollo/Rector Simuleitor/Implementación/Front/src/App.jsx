import { Game } from "./pages/Game";
import { Routes, Route } from "react-router-dom";
import { Start } from "./pages/Start";
import { useEvent } from "./store/useEvent";
import { Navigate } from "react-router-dom";
import { useResources } from "./store/useResources";
import { useEffect } from "react";
import { Characters } from "./pages/Characters";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Menu } from "./pages/Menu";
import { Records } from "./pages/Records";

function App() {
  const { start, event } = useEvent();
  const { money, people } = useResources();

  useEffect(() => {
    if (event) {
      console.log(money, people, event);
    }
  }, [event]);

  return (
    <Routes>
      <Route
        path="/game"
        element={start ? <Game /> : <Navigate to="/start" />}
      />
      <Route path="/start" element={<Start />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Menu />} />
      <Route path="/records" element={<Records />} />
    </Routes>
  );
}

export default App;
