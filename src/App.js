import React, { useState, useEffect } from "react";

const skupiny = [
  {
    id: 1,
    popis: "počítače, kancelářská technika, školní potřeby, nástroje, nářadí",
    doba: 3,
    rovnomerny: {
      prvni: 20,
      dalsi: 40,
    },
    zrychleny: {
      prvni: 3,
      dalsi: 4,
    },
  },
  {
    id: 2,
    popis: "osobní a nákladní automobily, pracovní stroje, TV a rozhlasové přijímače, nábytek",
    doba: 5,
    rovnomerny: {
      prvni: 11,
      dalsi: 22.25,
    },
    zrychleny: {
      prvni: 5,
      dalsi: 6,
    },
  },
  {
    id: 3,
    popis: "klimatizace, kotle k vytápění, výtahy, lodě",
    doba: 10,
    rovnomerny: {
      prvni: 5.5,
      dalsi: 10.5,
    },
    zrychleny: {
      prvni: 10,
      dalsi: 11,
    },
  },
  {
    id: 4,
    popis: "budovy ze dřeva a plastů, plynovody, energetická výrobní díla, osvětlení budov a staveb",
    doba: 20,
    rovnomerny: {
      prvni: 2.15,
      dalsi: 5.15,
    },
    zrychleny: {
      prvni: 20,
      dalsi: 21,
    },
  },
  {
    id: 5,
    popis: "výrobní budovy, dálnice, silnice, studny, vrty, mosty",
    doba: 30,
    rovnomerny: {
      prvni: 1.4,
      dalsi: 3.4,
    },
    zrychleny: {
      prvni: 30,
      dalsi: 31,
    },
  },
  {
    id: 6,
    popis: "obchodní domy, administrativní budovy, školy, kulturní památky",
    doba: 50,
    rovnomerny: {
      prvni: 1.02,
      dalsi: 2.02,
    },
    zrychleny: {
      prvni: 50,
      dalsi: 51,
    },
  },
];

function App() {
  const [cena, setCena] = useState(500000);
  const [skupina, setSkupina] = useState(2);
  const [zrychleno, setZrychleno] = useState(true);
  const [tabulka, setTabulka] = useState([]);

  useEffect(() => {
    setTabulka([]);

    let newTabulka = [];
    let zustatkovaCena = cena;
    const doba = skupiny.find((s) => s.id === +skupina).doba;
    for (let i = 1; i <= doba; i++) {
      if (!zrychleno) {
        const koeficienty = skupiny.find((s) => s.id === +skupina).rovnomerny;
        newTabulka.push({
          rok: i,
          castka: (cena * (i === 1 ? koeficienty.prvni : koeficienty.dalsi)) / 100,
        });
      } else {
        const koeficienty = skupiny.find((s) => s.id === +skupina).zrychleny;
        if (i === 1) {
          const castka = cena / koeficienty.prvni;
          zustatkovaCena = Math.floor(zustatkovaCena - castka);
          newTabulka.push({
            rok: i,
            castka: castka,
            zustatkovaCena: zustatkovaCena,
          });
        } else {
          const castka = (2 * zustatkovaCena) / (koeficienty.dalsi - (i - 1));
          zustatkovaCena = Math.floor(zustatkovaCena - castka);
          newTabulka.push({
            rok: i,
            castka: castka,
            zustatkovaCena: zustatkovaCena,
          });
        }
      }
    }

    setTabulka(newTabulka);
  }, [cena, skupina, zrychleno]);

  return (
    <>
      <header className="text-center mt-6 mb-3">
        <h1 className="text-3xl font-bold text-gray-800">Daňové odpisy</h1>
      </header>
      <main className="max-w-screen-sm mx-auto px-4 sm:px-0 flex flex-col items-start">
        <label htmlFor="cena" className="text-xl font-medium text-orange-500">
          Pořizovací cena (Kč)
        </label>
        <input
          type="number"
          id="cena"
          placeholder="Pořizovací cena"
          value={cena}
          onChange={(e) => {
            setCena(e.target.value);
          }}
          step="1000"
          className="bg-gray-100 focus:bg-gray-200 outline-none rounded-lg mt-1 px-4 py-2"
        />
        <label htmlFor="skupina" className="text-xl font-medium text-orange-500 mt-4">
          Odpisovací skupina
        </label>
        <select id="skupina" value={skupina} onChange={(e) => setSkupina(e.target.value)} className="bg-gray-100 focus:bg-gray-200 outline-none rounded-lg mt-1 px-4 py-2 max-w-full">
          {skupiny.map((skupina) => {
            return (
              <option key={skupina.id} value={skupina.id}>
                {skupina.id} - {skupina.popis}
              </option>
            );
          })}
        </select>
        <label htmlFor="skupina" className="text-xl font-medium text-orange-500 mt-4">
          Rovnoměrné/zrychlené odpisování
        </label>
        <select value={zrychleno} onChange={(e) => setZrychleno(e.target.value === "true")} className="bg-gray-100 focus:bg-gray-200 outline-none rounded-lg mt-1 px-4 py-2 max-w-full">
          <option value="false">rovnoměrné</option>
          <option value="true">zrychlené</option>
        </select>
        {tabulka && (
          <table className="mt-6 border-collapse text-center block overflow-x-auto whitespace-nowrap">
            <thead>
              <tr className="font-medium text-lg text-orange-500">
                <th>Rok</th>
                <th>Částka</th>
                {zrychleno && <th>Zůstatková cena</th>}
              </tr>
            </thead>
            <tbody>
              {tabulka.map((radek, i) => {
                return (
                  <tr key={i}>
                    <td>{radek.rok}.</td>
                    <td>{Math.ceil(radek.castka)} Kč</td>
                    {zrychleno && <td>{Math.floor(radek.zustatkovaCena)} Kč</td>}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </main>
      <footer className="text-center my-6 font-medium text-gray-700">
        Vytvořil{" "}
        <a href="https://hynekfisera.com/" className="text-orange-500 hover:underline">
          Hynek Fišera
        </a>
      </footer>
    </>
  );
}

export default App;
