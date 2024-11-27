import { InitialLayout } from "../layouts/InitialLayout";
import { useEffect, useState } from "react";
import axios from "axios";
import { Loader } from "../components/Loader";
import URL from "../constants/URL";

export const Records = () => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${URL}/top-scores`);
        setLoading(false);
        setScores(data);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log(error);
      }
    };
    fetchScores();
  }, []);

  if (loading || error)
    return <Loader message="Cargando Datos.." error={error} />;

  return (
    console.log(scores),
    (
      <InitialLayout tittle="Mejores Records" ret={true} mt="80px">
        <div className="mt-[60px] flex max-h-[400px] w-[80%] flex-col items-center overflow-y-auto md:mt-[80px] md:w-[50%] lg:w-[40%]">
          <table className="h-[80%] w-full border-separate border-black">
            <thead className="bg-[#BA6060] text-center text-2xl text-white">
              <tr>
                <th>Ranking</th>
                <th>Puntuación</th>
                <th>País</th>
              </tr>
            </thead>
            <tbody className="bg-[#D9D9D9] text-center">
              {scores.map((score, index) => (
                <tr key={index}>
                  <td>{score.jugador.usuario}</td>
                  <td>{score.score}</td>
                  <td>{score.jugador.pais}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </InitialLayout>
    )
  );
};
