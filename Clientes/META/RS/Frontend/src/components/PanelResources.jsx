import { useResources } from "../store/useResources";
import moneyIcon from "../assets/resources/money.svg";
import moneyEmpty from "../assets/resources/money-empty.svg";
import personIcon from "../assets/resources/person.svg";
import personEmpty from "../assets/resources/person-empty.svg";
import { Resource } from "./Resource";

export const PanelResources = () => {
  const { money, people } = useResources();

  return (
    <section className="flex justify-around">
      <Resource
        resource={{
          name: "Dinero",
          icon: moneyIcon,
          iconEmpty: moneyEmpty,
          state: money,
        }}
      />
      <Resource
        resource={{
          name: "Persona",
          icon: personIcon,
          iconEmpty: personEmpty,
          state: people,
        }}
      />
    </section>
  );
};
