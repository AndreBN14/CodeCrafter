import { MainLayout } from "../layouts/MainLayout";
import { PanelResources } from "../components/PanelResources";
import { Scenario } from "../components/Scenario";
import { ManagamentDays } from "../components/ManagamentDays";
import { Desicion } from "../components/Decision";
import ud from "../assets/backgrounds/university-day.svg";

export const Game = () => {
  return (
    <MainLayout
      background={ud}
      color="#C26464"
    >
      <PanelResources />
      <Scenario />
      <Desicion />
      <ManagamentDays />
    </MainLayout>
  );
};
