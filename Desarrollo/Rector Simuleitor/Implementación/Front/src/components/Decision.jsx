import { useResources } from "../store/useResources";
import { useEvent } from "../store/useEvent";
import { ButtonDe } from "./ui/ButtonDe";

export const Desicion = () => {
  const { money, people, impactMoney, impactPeople, setMoney, setPeople } =
    useResources();

  const { event, getEvent } = useEvent();

  const outOfResources = () => {
    return money < 0 || people < 0;
  };

  const consecuence = (resource, action) => {
    if (outOfResources()) {
      setMoney(100);
      setPeople(100);
    } else {
      resource === "dinero" ? impactMoney(action) : impactPeople(action);
      getEvent({ dinero: money, aprobacion: people });
    }
  };

  return (
    <div className="my-3 flex h-1/6 justify-around">
      <ButtonDe
        bg="red"
        onClick={() =>
          consecuence(
            event.decision1.consecuencia.recurso,
            event.decision1.consecuencia.accion,
          )
        }
        decision={event.decision1.decision}
        outOfResources={outOfResources}
      />
      <ButtonDe
        bg="green"
        isReplay={true}
        onClick={() =>
          consecuence(
            event.decision2.consecuencia.recurso,
            event.decision2.consecuencia.accion,
          )
        }
        decision={event.decision2.decision}
        outOfResources={outOfResources}
      />
    </div>
  );
};
