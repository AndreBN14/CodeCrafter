import student from "../assets/characters/student.svg";
import { useResources } from "../store/useResources";
import om from "../assets/finals/outOfMoney.svg";
import str from "../assets/finals/strike.svg";

export const Scenario = () => {
  const { money, people } = useResources();

  let final = null;

  if (money === 0) {
    final = {
      name: "Sin dinero",
      img: om,
      reason: "¡Se acabo el presupuesto!",
    };
  }

  if (people === 0) {
    final = {
      name: "Sin personas",
      img: str,
      reason: "¡Se alza una huelga!",
    };
  }

  return (
    <section
      className="scenario"
      style={{
        backgroundColor: "#D9D9D9",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "55%",
      }}
    >
      <h2 style={{ fontFamily: "Inria Sans", color: "#BA6060" }}>
        {final ? final.reason : "¡Exigimos mayoneza en el comedor!"}
      </h2>
      <div
        style={{
          backgroundColor: "#904949",
          width: "65%",
          height: "70%",
          borderRadius: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
        }}
      >
        <img
          src={final ? final.img : student}
          alt={final ? final.name : "student"}
          style={{
            height: "80%",
            width: "100%",
          }}
        />
      </div>
      <h2 style={{ fontFamily: "Inria Sans", color: "#BA6060" }}>
        {final ? "Despedido" : "Estudiante"}
      </h2>
    </section>
  );
};
