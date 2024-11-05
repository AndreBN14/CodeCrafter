import { InitialLayout } from "../layouts/InitialLayout";
import { Button } from "../components/ui/Button";

export const Menu = () => {
  return (
    <InitialLayout tittle="Rector Simulator" mt="80px" confb={true}>
      <Button to="/game">Continuar</Button>
      <Button to="/start">Nueva Partida</Button>
      <Button to="/records">Mejores Records</Button>
      <div className="flex w-full gap-2">
        <Button width="half" to="/login">
          Iniciar Sesión
        </Button>
        <Button width="half">Salir</Button>
      </div>
    </InitialLayout>
  );
};
