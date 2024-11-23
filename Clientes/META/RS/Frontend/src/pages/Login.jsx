import { InitialLayout } from "../layouts/InitialLayout";
import { Button } from "../components/ui/Button";
import { FormField } from "../components/ui/FormField";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { login } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    login(data);
    reset();
    navigate("/game");
  });

  return (
    <InitialLayout tittle="Iniciar Sesión">
      <form
        className="mt-[60px] flex h-[60%] w-[80%] flex-col items-center md:mt-[80px] md:w-[50%] lg:w-[40%]"
        onSubmit={onSubmit}
      >
        <FormField
          label="Usuario"
          type="text"
          id="username"
          register={register("usuario", {
            required: "El usuario es requerido",
          })}
          errors={errors.usuario}
        />
        <FormField
          label="Contraseña"
          type="password"
          id="password"
          register={register("password", {
            required: "La contraseña es requerida",
          })}
          errors={errors.password}
        />
        <div className="mt-24 flex w-full gap-2">
          <Button
            width="half"
            type="button"
            onClick={() => navigate("/register")}
          >
            Registrarse
          </Button>
          <Button width="half" type="submit">
            Iniciar
          </Button>
        </div>
      </form>
    </InitialLayout>
  );
};
