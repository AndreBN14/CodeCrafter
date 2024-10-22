import { InitialLayout } from "../layouts/InitialLayout";
import backgroundMusic from "../sounds/Mogeko Yankee.mp3"; // Ruta al archivo mp3
import { useEffect, useRef } from "react";
import Settingicon from "../assets/others/configuration.svg";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import './Login.css'; // Importa el CSS específico para el login

export const Login = () => {
  const audioRef = useRef(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    const handleAudioPlay = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.1; // Ajusta el volumen
        audioRef.current.play().catch((error) => {
          console.warn("El audio no se pudo reproducir automáticamente:", error);
        });
      }
    };

    window.addEventListener("click", handleAudioPlay, { once: true });

    return () => {
      window.removeEventListener("click", handleAudioPlay);
    };
  }, []);

  // Función para navegar a la página de registro
  const handleRegister = () => {
    navigate("/register"); // Asegúrate de que la ruta sea correcta
  };

  return (
    <InitialLayout title="Iniciar Sesión">
      <div className="login-container">
        <h1 className="login-title">Iniciar Sesión</h1>
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input type="text" id="username" className="login-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" className="login-input" required />
        </div>
        <div className="buttons-row">
          <button className="small-button">Iniciar Sesión</button>
          <button className="small-button" onClick={handleRegister}>Registrarse</button> {/* Botón para ir al registro */}
        </div>
        <div className="settings-icon">
          <img className="settings-image" src={Settingicon} alt="Configuración" />
        </div>
      </div>
      <div className="bottom-gif"></div> {/* Div que contiene el GIF en la parte inferior */}
      <audio ref={audioRef} src={backgroundMusic} loop />
    </InitialLayout>
  );
};
