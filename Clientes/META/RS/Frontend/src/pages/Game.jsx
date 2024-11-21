import { MainLayout } from "../layouts/MainLayout";
import { PanelResources } from "../components/PanelResources";
import { Scenario } from "../components/Scenario";
import { ManagamentDays } from "../components/ManagamentDays";
import { Desicion } from "../components/Decision";
import { useEvent } from "../store/useEvent";
import ud from "../assets/backgrounds/university-day.svg";
import loadingGif from "../assets/others/bandr-unscreen.gif";

export const Game = () => {
  const { error, loading } = useEvent();

  if (error || loading) {
    return (
      <MainLayout background={ud} color="#C26464">
        <div className="flex h-full w-full items-center justify-center">
          {error ? (
            <p className="text-3xl text-white">{error}</p>
          ) : (
            <img
              className="h-1/2 w-1/2 object-contain"
              src={loadingGif}
              alt="Cargando..."
            />
          )}
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
