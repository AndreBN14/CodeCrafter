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
import { useAuth } from "./store/useAuth";
import { Loader } from "./components/Loader";
import { useDate } from "./store/useDate";

function App() {
  const { start, event } = useEvent();
  const { money, people } = useResources();
  const { user, loading: loadingAuth, error: errorAuth, setUser } = useAuth();
  const { loading: loadingDate, error: errorDate } = useDate();

  useEffect(() => {
    if (event) {
      console.log(money, people, event);
    }
  }, [event]);

  useEffect(() => {
    const authdata = localStorage.getItem("authData");
    if (authdata) {
      const data = JSON.parse(authdata);
      setUser(data);
    }
  }, []);

  if (loadingAuth || errorAuth)
    return <Loader message="Validando Datos.." error={errorAuth} />;

  if (loadingDate || errorDate)
    return <Loader message="Cargando Datos.." error={errorDate} />;

  return (
    <Routes>
      <Route
        path="/game"
        element={start ? <Game /> : <Navigate replace to="/start" />}
      />
      <Route
        path="/start"
        element={user ? <Start /> : <Navigate replace to="/login" />}
      />
      <Route
        path="/characters"
        element={user ? <Characters /> : <Navigate replace to="/login" />}
      />
      <Route
        path="/login"
        element={user ? <Navigate replace to="/" /> : <Login />}
      />
      <Route
        path="/register"
        element={user ? <Navigate replace to="/" /> : <Register />}
      />
      <Route path="/" element={<Menu />} />
      <Route path="/records" element={<Records />} />
    </Routes>
  );
}

export default App;
