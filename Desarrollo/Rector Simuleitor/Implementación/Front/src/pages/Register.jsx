import { InitialLayout } from "../layouts/InitialLayout";
import backgroundMusic from "../sounds/Mogeko Yankee.mp3"; // Ruta al archivo mp3
import { useEffect, useRef } from "react";
import Settingicon from "../assets/others/configuration.svg";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación
import './Register.css'; // Importa el CSS específico para el registro

export const Register = () => {
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

  // Función para navegar a la página de inicio de sesión
  const handleCancel = () => {
    navigate("/login"); // Asegúrate de que la ruta sea correcta
  };

  return (
    <InitialLayout title="Registro">
      <div className="register-container">
        <h1 className="register-title">Registrarse</h1>
        
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input type="email" id="email" className="register-input" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario</label>
          <input type="text" id="username" className="register-input" required />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" className="register-input" required />
        </div>
        
        <div className="buttons-row">
          <button className="small-button">Registrarse</button>
          <button className="small-button" onClick={handleCancel}>Cancelar</button> {/* Botón de cancelar */}
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
