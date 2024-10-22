import un from "../assets/backgrounds/university-night.svg";
import conf from "../assets/others/configuration.svg";
import { MainLayout } from "../layouts/MainLayout";
export const Start = () => {
  return (
    <MainLayout
      background={un}
      color="#C26464"
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30%",
        }}
      >
        <img
          src={conf}
          alt="configuration"
          style={{
            width: "50px",
            height: "50px",
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          lineHeight: "1.2",
          fontFamily: "Inknut Antiqua",
          marginTop: "90px",
        }}
      >
        <h2
          style={{
            margin: "0",
            height: "30%",
          }}
        >
          Año
        </h2>
        <h1
          style={{
            margin: "0",
            height: "40%",
          }}
        >
          2024
        </h1>
      </div>
      <div
        style={{
          backgroundColor: "#5A2F2F",
          height: "15%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          fontFamily: "Inria Sans",
          fontSize: "20px",
          marginTop: "15px",
        }}
      >
        <p>Continuar</p>
      </div>
    </MainLayout>
  );
};
