// Desicion.jsx
import React from "react";
import { useDate } from "../store/useDate";
import { useResources } from "../store/useResources";
import { useEvent } from "../store/useEvent";
import { ButtonDe } from "./ui/ButtonDe";
import { useAuth } from "../store/useAuth";
import { useNavigate } from "react-router-dom";

export const Desicion = () => {
  const {
    money,
    people,
    impactMoney,
    impactPeople,
    reset: resetResources,
  } = useResources();
  const { event, getEvent, restartGame } = useEvent();
  const { saveScore, reset: resetDate, incrementDate, day, month } = useDate();
  const { user } = useAuth();

  const navigate = useNavigate();

  const outOfResources = () => {
    return money <= 0 || people <= 0;
  };

  const consecuence = (resource, action, back) => {
    if (outOfResources()) {
      saveScore(user, money, people, day, month);
      if (back) navigate("/");
      resetResources();
      resetDate();
      restartGame();
    } else {
      resource === "dinero" ? impactMoney(action) : impactPeople(action);
      getEvent({ dinero: money, aprobacion: people });

      // Incrementar el día y el mes
      incrementDate();
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
            true,
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
            false,
          )
        }
        decision={event.decision2.decision}
        outOfResources={outOfResources}
      />
    </div>
  );
};
