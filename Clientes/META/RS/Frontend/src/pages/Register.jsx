import { InitialLayout } from "../layouts/InitialLayout";
import { Button } from "../components/ui/Button";
import { FormField } from "../components/ui/FormField";
import { useForm } from "react-hook-form";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { register: registerAuth } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    registerAuth(data);
    reset();
  });

  return (
    <InitialLayout tittle="Registrarse" reg={true}>
      <form
        className="mt-[20px] flex h-[60%] w-[80%] flex-col items-center md:mt-[30px] md:w-[50%] lg:w-[40%]"
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
        <FormField
          label="Pais"
          type="text"
          id="country"
          register={register("pais", { required: "El pais es requerido" })}
          errors={errors.pais}
        />
        <FormField
          label="Email"
          type="email"
          id="email"
          register={register("email", {
            required: "El email es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de email no válido",
            },
          })}
          errors={errors.email}
        />
        <FormField
          label="Nombre"
          type="text"
          id="name"
          register={register("first_name", {
            required: "El nombre es requerido",
          })}
          errors={errors.first_name}
        />
        <FormField
          label="Apellido"
          type="text"
          id="lastname"
          register={register("last_name", {
            required: "El apellido es requerido",
          })}
          errors={errors.last_name}
        />
        <div className="mt-4 flex w-full gap-2">
          <Button width="half" type="submit">
            Registrarse
          </Button>
          <Button width="half" type="button" onClick={() => navigate("/")}>
            Volver
          </Button>
        </div>
      </form>
    </InitialLayout>
  );
};
