import { InitialLayout } from "../layouts/InitialLayout";
import { Button } from "../components/ui/Button";
import { FormField } from "../components/ui/FormField";

export const Register = () => {
  return (
    <InitialLayout tittle="Registrarse" mt="80px">
      <FormField label="Usuario" type="text" id="username" />
      <FormField label="Contraseña" type="password" id="password" />
      <FormField label="Confirmar Contraseña" type="password" id="password" />
      <div className="mt-16 flex w-full gap-2">
        <Button width="half">Registrarse</Button>
        <Button width="half">Iniciar</Button>
      </div>
    </InitialLayout>
  );
};
