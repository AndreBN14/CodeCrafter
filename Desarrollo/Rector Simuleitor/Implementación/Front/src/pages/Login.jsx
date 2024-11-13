import { InitialLayout } from "../layouts/InitialLayout";
import { Button } from "../components/ui/Button";
import { FormFieldGozu } from "../components/ui/FormFielGozu.jsx";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    console.log("Botón presionado");
    console.log("Datos de entrada:", { username, password }); // Verifica los datos
    alert("Boton vive ");

    try {
      const response = await fetch("http://localhost:8000/sesion/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Inicio de sesión exitoso");
      } else {
        const data = await response.json();
        alert(data.message || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la conexión con el servidor");
    }
  };

  return (
    <InitialLayout title="Iniciar Sesión">
      <FormFieldGozu
        label="Usuario"
        type="text"
        id="username"
        value={username} // Pasa el estado aquí
        onChange={(e) => setUsername(e.target.value)} // Actualiza el estado
      />
      <FormFieldGozu
        label="Contraseña"
        type="password"
        id="password"
        value={password} // Pasa el estado aquí
        onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
      />
      <div className="mt-24 flex w-full gap-2">
        <Button width="half" to="/register">
          Registrarse
        </Button>
        <button onClick={handleLogin}>Iniciar</button>
      </div>
    </InitialLayout>
  );
};

/*
import { useState } from "react";
import { InitialLayout } from "../layouts/InitialLayout";
import { Button } from "../components/ui/Button";
import { FormField } from "../components/ui/FormField";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8000/sesion/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include", // Incluir cookies para que Django maneje la sesión
      });

      const data = await response.json();

      if (response.ok) {
        alert("Inicio de sesión exitoso");
        // Redirige o realiza alguna acción después de iniciar sesión
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error en la solicitud de inicio de sesión:", error);
    }
  };

  return (
    <InitialLayout title="Iniciar Sesión">
      <FormField label="Usuario" type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <FormField label="Contraseña" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="mt-24 flex w-full gap-2">
        <Button width="half" to="/register">
          Registrarse
        </Button>
        <Button width="half" onClick={handleLogin}>
          Iniciar
        </Button>
      </div>
    </InitialLayout>
  );
};
*/
