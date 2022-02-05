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
  const [cena, setCena] = useState(100000);
  const [skupina, setSkupina] = useState(1);
  const [zrychleno, setZrychleno] = useState(false);
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
    <main>
      <input
        type="number"
        placeholder="Cena"
        value={cena}
        onChange={(e) => {
          setCena(e.target.value);
        }}
        step="1000"
      />
      <select value={skupina} onChange={(e) => setSkupina(e.target.value)}>
        {skupiny.map((skupina) => {
          return (
            <option key={skupina.id} value={skupina.id}>
              {skupina.id} - {skupina.popis}
            </option>
          );
        })}
      </select>
      <select value={zrychleno} onChange={(e) => setZrychleno(e.target.value === "true")}>
        <option value="false">rovnoměrná</option>
        <option value="true">zrychlená</option>
      </select>
      {tabulka && (
        <table>
          <thead>
            <tr>
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
  );
}

export default App;
