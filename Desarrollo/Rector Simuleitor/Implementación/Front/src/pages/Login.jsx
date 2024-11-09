import { InitialLayout } from "../layouts/InitialLayout";
import { Button } from "../components/ui/Button";
import { FormField } from "../components/ui/FormField";

export const Login = () => {
  return (
    <InitialLayout tittle="Iniciar Sesión" mt="130px">
      <FormField label="Usuario" type="text" id="username" />
      <FormField label="Contraseña" type="password" id="password" />
      <div className="mt-24 flex w-full gap-2">
        <Button width="half" to="/register">
          Registrarse
        </Button>
        <Button width="half">Iniciar</Button>
      </div>
    </InitialLayout>
  );
};
