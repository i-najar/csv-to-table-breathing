import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("sampleinventory.csv")
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          download: true,
          header: true,
          complete: (results) => {
            console.log("PARSE RESULTS:", results);
            setData(results.data);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
          },
        });
      })
      .catch((error) => console.error("Error fetching CSV:", error));
  }, []);

  console.log(data);

  return (
    <div className="App">
      <h1>Sample Inventory CSV</h1>
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((header) => (
                <th key={header}>{header}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
