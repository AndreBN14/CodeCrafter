import { useResources } from "../store/useResources";
import om from "../assets/finals/outOfMoney.svg";
import str from "../assets/finals/strike.svg";
import { useEvent } from "../store/useEvent";

export const Scenario = () => {
  const { money, people } = useResources();

  const { event, character } = useEvent();

  let final = null;

  if (money <= 0) {
    final = {
      name: "Sin dinero",
      img: om,
      reason: "¡Se acabó el presupuesto!",
    };
  }

  if (people <= 0) {
    final = {
      name: "Sin personas",
      img: str,
      reason: "¡Se alza una huelga!",
    };
  }

  return (
    <section className="flex h-[55%] flex-col items-center justify-center bg-[#D9D9D9] p-8 font-s">
      {/* Contenedor adaptable en ancho */}
      <div className="mt-3 flex w-auto max-w-[90%] items-center justify-center rounded-[10px] bg-[#BA6060] p-4">
        <div className="relative flex w-full">
          <p className="w-full text-center text-white">
            {final ? final.reason : event.evento}
          </p>
        </div>
      </div>
      <img
        className="mt-4 h-4/5 w-[50%] object-contain"
        src={final ? final.img : character.img}
        alt={final ? final.name : character.name}
      />
      <h2 className="text-2xl text-[#BA6060]">
        {final ? "Despedido" : character.name}
      </h2>
    </section>
  );
};




/*
Forma no adaptativa :(
import { useResources } from "../store/useResources";
import om from "../assets/finals/outOfMoney.svg";
import str from "../assets/finals/strike.svg";
import { useEvent } from "../store/useEvent";

export const Scenario = () => {
  const { money, people } = useResources();

  const { event, character } = useEvent();

  let final = null;

  if (money <= 0) {
    final = {
      name: "Sin dinero",
      img: om,
      reason: "¡Se acabo el presupuesto!",
    };
  }

  if (people <= 0) {
    final = {
      name: "Sin aprobación",
      img: str,
      reason: "¡Se alza una huelga!",
    };
  }

  return (
    <section className="flex h-[55%] flex-col items-center justify-center bg-[#D9D9D9] p-8 font-s">
      <h2 className="text-center text-2xl text-[#BA6060]">
        {final ? final.reason : event.evento}
      </h2>
      <div className="mt-3 flex h-[70%] w-[65%] items-end justify-center rounded-[10px] bg-[#BA6060]">
        <img
          className="h-4/5 w-full"
          src={final ? final.img : character.img}
          alt={final ? final.name : character.name}
        />
      </div>
      <h2 className="text-2xl text-[#BA6060]">
        {final ? "Despedido" : character.name}
      </h2>
    </section>
  );
};
*/
