import { InitialLayout } from "../layouts/InitialLayout";
import { Button } from "../components/ui/Button";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";
import { useConfig } from "../store/useConfig";

export const Menu = () => {
  const { user, logout } = useAuth();
  const { playSoundEffect } = useConfig();

  const navigate = useNavigate();

  return (
    <InitialLayout tittle="Rector Simulator" confb={true}>
      <div className="mt-[100px] flex h-[60%] w-[80%] flex-col items-center md:mt-[120px] md:w-[50%] lg:w-[40%]">
        <Button
          onClick={() => {
            playSoundEffect();
            navigate("/game");
          }}
        >
          Jugar
        </Button>
        <Button
          onClick={() => {
            playSoundEffect();
            navigate("/records");
          }}
        >
          Mejores Records
        </Button>
        {user ? (
          <Button
            onClick={() => {
              playSoundEffect();
              logout();
            }}
          >
            Salir
          </Button>
        ) : (
          <Button
            onClick={() => {
              playSoundEffect();
              navigate("/login");
            }}
          >
            Iniciar Sesión
          </Button>
        )}
      </div>
    </InitialLayout>
  );
};
