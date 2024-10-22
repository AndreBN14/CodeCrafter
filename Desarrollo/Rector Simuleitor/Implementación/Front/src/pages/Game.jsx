import { MainLayout } from "../layouts/MainLayout";
import { PanelResources } from "../components/PanelResources";
import { Scenario } from "../components/Scenario";
import { ManagamentDays } from "../components/ManagamentDays";
import { Desicion } from "../components/Decision";
import ud from "../assets/backgrounds/university-day.svg";
import { useEvent } from "../store/useEvent";

export const Game = () => {
  const { error, loading } = useEvent();

  if (error || loading) {
    return (
      <MainLayout background={ud} color="#C26464">
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-3xl text-white">{error ? error : "Cargando..."}</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout background={ud} color="#C26464">
      <PanelResources />
      <Scenario />
      <Desicion />
      <ManagamentDays />
    </MainLayout>
  );
};
