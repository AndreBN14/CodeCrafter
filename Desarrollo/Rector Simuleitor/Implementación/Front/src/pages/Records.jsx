import { InitialLayout } from "../layouts/InitialLayout";

const records = [
  {
    record: "1",
    puntaje: "5 meses y 12 días",
  },
  {
    record: "2",
    puntaje: "4 meses y 20 días",
  },
  {
    record: "3",
    puntaje: "2 meses y 10 días",
  },
  {
    record: "4",
    puntaje: "1 meses y 14 días",
  },
  {
    record: "5",
    puntaje: "0 meses y 29 días",
  },
];

export const Records = () => {
  return (
    <InitialLayout tittle="Mejores Records" ret={true} mt="80px">
      <div className="mt-[60px] flex h-[60%] w-[80%] flex-col items-center md:mt-[80px] md:w-[50%] lg:w-[40%]">
        <table className="h-[80%] w-full border-separate border-black">
          <thead className="bg-[#BA6060] text-center text-2xl text-white">
            <tr>
              <th>Rank</th>
              <th>Puntuación</th>
            </tr>
          </thead>
          <tbody className="bg-[#D9D9D9] text-center">
            {records.map((record) => (
              <tr key={record.record}>
                <td>{record.record}</td>
                <td>{record.puntaje}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InitialLayout>
  );
};
