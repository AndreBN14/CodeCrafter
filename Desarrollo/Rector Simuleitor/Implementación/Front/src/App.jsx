import { Game } from "./pages/Game";
import { Routes, Route } from "react-router-dom";
import { Start } from "./pages/Start";
import { useEvent } from "./store/useEvent";
import { Navigate } from "react-router-dom";
import { useResources } from "./store/useResources";
import { useEffect } from "react";

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
    </Routes>
  );
}

export default App;
